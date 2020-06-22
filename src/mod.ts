declare const global: {
  log(message: string): void,
  create_app_launch_context(
    timestamp: number,
    workspace: number,
  ): ApplicationLaunchContext;
  display: {
    get_current_time_roundtrip(): number;
  };
};
declare const imports: {
  gi: {
    Gio: {
      icon_new_for_string(name: string): GioIcon;
      app_info_launch_default_for_uri(
        uri: string,
        launchContext: ApplicationLaunchContext,
      ): any;
    };
    Soup: {
      URI: typeof SoupURI;
      Session: typeof SoupSession;
      form_request_new_from_hash(
        method: string,
        uri: string,
        form_data_set: Record<string, string>,
      ): SoupMessage;
    };
  };
  ui: {
    main: {
      overview: {
        viewSelector: {
          _searchResults: {
            _registerProvider(provider: SearchProvider): void
            _unregisterProvider(provider: SearchProvider): void
          }
        }
      }
    };
  };
  misc: {
    extensionUtils: {
      getCurrentExtension(): Extension;
    };
  };
};

declare class Extension {
  dir: {
    get_path(): string;
  };
}

declare class SoupURI {
  get_host(): string;
  constructor(uri: string);
}

declare class SoupSession {
  user_agent: string;
  queue_message(
    message: SoupMessage,
    cb: (session: SoupSession, message: SoupMessage) => void,
  ): void;
}

declare interface SoupMessage {
  response_body: {
    data: string;
  };
}

declare interface ApplicationLaunchContext {}

declare interface GioIcon {}

declare interface SearchResultMeta {
  id: string;
  name: string;
  description?: string;
  clipboardText?: string;
  createIcon: (size: number) => GioIcon|null
}

declare interface SearchProvider {
  appInfo?: { get_name(): string; get_icon(): GioIcon; get_id(): string };
  createResultObject?(metaInfo: SearchResultMeta, resultsView: any): any;
  getResultMetas(
    resultIds: string[],
    callback: (results: SearchResultMeta[]) => void,
  ): void;
  getInitialResultSet(
    terms: string[],
    callback: (results: string[]) => void,
  ): void;
  getSubsearchResultSet(
    previousResults: string[],
    terms: string[],
    callback: (results: string[]) => void,
  ): void;
  filterResults(results: string[], maxNumber: number): string[];
  activateResult(id: string): void;
}

declare interface SearchAnswer {
  type: string;
  answer: string;
  query: string;
}

/* DDG APIs */
declare interface DDGIcon {
  URL: string;
  Width: string;
  Height: string;
}

declare interface DDGResult {
  Result: string;
  FirstURL: string;
  Icon: DDGIcon;
  Text: string;
}

declare interface DDGInstantAnswer {
  Abstract: string;
  AbstractText: string;
  AbstractSource: string;
  AbstractURL: string;
  Image: string;
  Heading: string;
  Answer: string;
  Redirect: string;
  AnswerType:
    | "calc"
    | "color"
    | "digest"
    | "info"
    | "ip"
    | "iploc"
    | "phone"
    | "pw"
    | "rand"
    | "regexp"
    | "unicode"
    | "upc"
    | "zip";
  Definition: string;
  DefinitionSource: string;
  RelatedTopics: DDGResult[];
  Results: DDGResult[];
  Type:
    | "A" // Answer
    | "D" // Disambiguation
    | "C" // Category
    | "N" // Name
    | "E"; // Exclusive
}

declare interface DDGSuggestion {
  phrase: string;
}
