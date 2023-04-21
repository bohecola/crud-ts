import { useCore } from "@/hooks";

declare type Emit = (name: "selection-change" | "sort-change", ...args: any[]) => void;
declare type Table = Vue.Ref<any>;
declare type Config = ClTable.Config;
declare interface Sort {
  defaultSort: {
    prop?: string;
    order?: string;
  };
  changeSort(prop: string, order: string): void;
}

// 排序
export function useSort({ config, emit, Table }: { config: Config; emit: Emit; Table: Table }) {
  const { crud } = useCore();

  // 设置默认排序
  const defaultSort = (function () {
    let { prop, order } = config.defaultSort || {};

    const item = config.columns.find((column) => 
      ["desc", "asc", "descending", "ascending"].find((a) => a == column.sortable)
    );

    if (item) {
      prop = item.prop;
      order = ["descending", "desc"].find((a) => a == item.sortable)
        ? "descending"
        : "ascending";
    }

    if (order && prop) {
      crud.params.order = ["descending", "desc"].includes(order) ? "desc" : "asc";
      crud.params.prop = prop;

      return {
        prop,
        order
      };
    }

    return {};
  })();

  // 排序监听
  function onSortChange({ prop, order }: { prop: string | undefined; order: string }) {
    if (config.sortRefresh)  {
      if (order === "descending") {
        order = "desc";
      }

      if (order === "ascending") {
        order = "asc";
      }

      if (!order) {
        prop = undefined;
      }

      crud.refresh({ prop, order, page: 1 });
    }

    emit("sort-change", { prop, order });
  }
}