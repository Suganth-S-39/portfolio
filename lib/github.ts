import { githubProjectTargets, type GitHubProjectTarget } from "@/content/portfolio";
import { siteConfig } from "@/content/site";

const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_API_VERSION = "2022-11-28";
const REPOSITORY_REVALIDATE_SECONDS = 60 * 60;

interface GitHubRepositoryResponse {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
}

export interface RepositorySummary {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

export interface TargetRepositorySummary {
  target: GitHubProjectTarget;
  repository: RepositorySummary | null;
}

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function mapRepository(repository: GitHubRepositoryResponse): RepositorySummary {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    url: repository.html_url,
    description: repository.description,
    homepage: repository.homepage,
    language: repository.language,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    topics: repository.topics ?? [],
    updatedAt: repository.updated_at,
  };
}

function createGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function fetchUserRepositories(
  username = siteConfig.githubUsername,
): Promise<RepositorySummary[]> {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: createGitHubHeaders(),
      next: {
        revalidate: REPOSITORY_REVALIDATE_SECONDS,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub repository request failed with ${response.status}.`);
  }

  const repositories = (await response.json()) as GitHubRepositoryResponse[];

  return repositories.map(mapRepository);
}

export async function fetchTargetRepositories(
  targets = githubProjectTargets,
): Promise<TargetRepositorySummary[]> {
  const repositories = await fetchUserRepositories();
  const repositoriesByNormalizedName = new Map(
    repositories.map((repository) => [normalizeName(repository.name), repository]),
  );

  return targets.map((target) => {
    const repository =
      target.repositoryNameHints
        .map(normalizeName)
        .map((hint) => repositoriesByNormalizedName.get(hint))
        .find(Boolean) ?? null;

    return {
      target,
      repository,
    };
  });
}
