import unfetch from "@plasmicapp/isomorphic-unfetch";

export interface ComponentMeta {
  id: string;
  usedComponents: string[];
  projectId: string;
  name: string;
  displayName: string;
  cssFile: string;
  path: string | undefined;
  isPage: boolean;
  plumeType?: string;
  entry: string;
  isCode: boolean;
  isGlobalContextProvider: boolean;
  pageMetadata?: PageMetadata;
  metadata?: Record<string, string>;
}

export interface PageMeta extends ComponentMeta {
  isPage: true;
  path: string;
  plumeType: never;
  pageMetadata: PageMetadata;
}

export interface PageMetadata {
  path: string;
  title?: string | null;
  description?: string | null;
  openGraphImageUrl?: string | null;
  canonical?: string | null;
}

export interface GlobalGroupMeta {
  id: string;
  projectId: string;
  name: string;
  type: string;
  contextFile: string;
  useName: string;
}

export interface ProjectMeta {
  id: string;
  teamId?: string;
  indirect?: boolean;
  name: string;
  version: string;
  remoteFonts: FontMeta[];
  globalContextsProviderFileName: string;
}

export interface FontMeta {
  url: string;
}

interface GlobalVariantSplitContent {
  type: "global-variant";
  projectId: string;
  group: string;
  variant: string;
}

interface Slice {
  id: string;
  contents: GlobalVariantSplitContent[];
  externalId?: string;
}

export interface ExperimentSlice extends Slice {
  prob: number;
}

export interface SegmentSlice extends Slice {
  cond: any;
}

export interface ExperimentSplit {
  id: string;
  projectId: string;
  externalId?: string;
  type: "experiment";
  slices: ExperimentSlice[];
}

export interface SegmentSplit {
  id: string;
  projectId: string;
  externalId?: string;
  type: "segment";
  slices: SegmentSlice[];
}

export type Split = ExperimentSplit | SegmentSplit;

export interface LoaderBundleOutput {
  modules: {
    browser: (CodeModule | AssetModule)[];
    server: (CodeModule | AssetModule)[];
  };
  external: string[];
  components: ComponentMeta[];
  globalGroups: GlobalGroupMeta[];
  projects: ProjectMeta[];
  activeSplits: Split[];
}

export interface LoaderHtmlOutput {
  html: string;
}

export interface CodeModule {
  fileName: string;
  code: string;
  imports: string[];
  type: "code";
}

export interface AssetModule {
  fileName: string;
  source: string;
  type: "asset";
}

const VERSION = "10";

export const isBrowser =
  typeof window !== "undefined" &&
  window != null &&
  typeof window.document !== "undefined";

export class Api {
  private host: string;
  private fetch: typeof globalThis.fetch;
  constructor(
    private opts: {
      projects: { id: string; token: string }[];
      host?: string;
      nativeFetch?: boolean;
    }
  ) {
    this.host = opts.host ?? "https://codegen.plasmic.app";
    this.fetch = (
      opts.nativeFetch && globalThis.fetch ? globalThis.fetch : unfetch
    ).bind(globalThis);
  }

  async fetchLoaderData(
    projectIds: string[],
    opts: {
      platform?: "react" | "nextjs" | "gatsby";
      platformOptions?: {
        nextjs?: {
          appDir: boolean;
        };
      };
      preview?: boolean;
      browserOnly?: boolean;
      i18nKeyScheme?: "content" | "hash" | "path";
      i18nTagPrefix?: string;
      skipHead?: boolean;
    }
  ) {
    const { platform, preview } = opts;
    const query = new URLSearchParams([
      ["platform", platform ?? "react"],
      ...(opts.platformOptions?.nextjs?.appDir
        ? [["nextjsAppDir", "true"]]
        : []),
      ...projectIds.map((projectId) => ["projectId", projectId]),
      ...(opts.browserOnly ? [["browserOnly", "true"]] : []),
      ...(opts.i18nKeyScheme ? [["i18nKeyScheme", opts.i18nKeyScheme]] : []),
      ...(opts.i18nTagPrefix ? [["i18nTagPrefix", opts.i18nTagPrefix]] : []),
      ...(opts.skipHead ? [["skipHead", "true"]] : []),
    ]).toString();

    const url = `${this.host}/api/v1/loader/code/${
      preview ? "preview" : "published"
    }?${query}`;
    const resp = await this.fetch(url, {
      method: "GET",
      headers: this.makeGetHeaders(),
    });
    if (resp.status >= 400) {
      const error = await this.parseJsonResponse(resp);
      throw new Error(
        `Error fetching loader data: ${
          error?.error?.message ?? resp.statusText
        }`
      );
    }
    const json = await this.parseJsonResponse(resp);
    return json as LoaderBundleOutput;
  }

  private async parseJsonResponse(resp: Response) {
    const text = await resp.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error(
        `Error parsing JSON response: ${err}; status: ${resp.status}; response: ${text}`
      );
    }
  }

  async fetchHtmlData(opts: {
    projectId: string;
    component: string;
    hydrate?: boolean;
    embedHydrate?: boolean;
  }) {
    const { projectId, component, embedHydrate, hydrate } = opts;
    const query = new URLSearchParams([
      ["projectId", projectId],
      ["component", component],
      ["embedHydrate", embedHydrate ? "1" : "0"],
      ["hydrate", hydrate ? "1" : "0"],
    ]).toString();
    const resp = await this.fetch(`${this.host}/api/v1/loader/html?${query}`, {
      method: "GET",
      headers: this.makeGetHeaders(),
    });
    const json = await resp.json();
    return json as LoaderHtmlOutput;
  }

  private makeGetHeaders() {
    return {
      "x-plasmic-loader-version": VERSION,
      ...this.makeAuthHeaders(),
    };
  }

  private makeAuthHeaders() {
    const tokens = this.opts.projects
      .map((p) => `${p.id}:${p.token}`)
      .join(",");
    return {
      "x-plasmic-api-project-tokens": tokens,
    };
  }
}
