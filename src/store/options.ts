import { Layout, LayoutPart } from "@/types/layout";
import { Option } from "@/types/option";
import { create } from "zustand";

interface Options {
  layout?: Layout,
  content: LayoutPart[],
  selected?: Option
}

interface OptionsMethods {
  setLayout: (layout: Layout) => void
  setContent: (content: LayoutPart[]) => void
  pickContent: (option: Option) => void
}

const options: Options = {
  content: [],
}

const useOptions = create<Options & OptionsMethods>((set, _get) => ({
  ...options,
  setLayout(layout) {
    set({ layout });
  },
  setContent(content) {
    set({ content });
  },
  pickContent(selected) {
    set({ selected });
  }
}));

export default useOptions;