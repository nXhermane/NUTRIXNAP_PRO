import { SearchEngineOptions, SearchEngine } from "@shared";

export default function <T>(data: T[] = [], options?: SearchEngineOptions) {
    return new SearchEngine(data, options);
}
