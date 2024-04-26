import Trie, {
    TrieOptions,
    TrieNodeValue,
    Value,
    TrieResultValue
} from "./trie";
import Config from "./config";
import { isDefined } from "./helpers/types";
export interface SearchEngineOptions extends TrieOptions {}
export class SearchEngine<T extends Value = Value> {
    private trie: Trie<T>;
    private options: SearchEngineOptions = {
        prefixSearch: false
    };
    constructor(list: T[] = [], options: SearchEngineOptions = {}) {
        this.options = { ...this.options, ...options };
        this.trie = new Trie<T>(this.options);
        this.init(list);
    }
    private init(list: T[]) {
        this.trie = new Trie<T>(this.options);
        for (const item of list) {
            this.trie.insert(item);
        }
    }
    setList(list: T[]) {
        if (!isDefined(list)) return;
        this.init(list);
    }
    add(item: T) {
        if (!isDefined(item)) return;
        this.trie.insert(item);
    }
    search(pattern: string, validate = (value: TrieResultValue<T>) => true) {
        const { prefixSearch } = this.options;
        let results: TrieResultValue<T>[];
        if (prefixSearch) {
            results = this.trie.search(pattern, validate);
        } else {
            results = this.trie.searchFuzzi(pattern, validate);
        }
        results.sort(Config.sortFn);
        return results;
    }
}
