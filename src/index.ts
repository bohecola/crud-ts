import type { App } from "vue";
import { useComponent } from "./components";
import { useBrowser } from "./hooks";
import { deepMerge } from "./utils";
import temp from "./utils/temp";
import { locale } from "./locale";
import { emitter } from "./emitter";
import "./static/index.scss";

const Crud = {
  install(app: App, options: Options) {

    // 默认配置
    const defaultConfig = {
      permission: {
        update: true,
        page: true,
        info: true,
        list: true,
        add: true,
        delete: true
      },
      dict: {
        primaryId: "id",
        api: {
          list: "list",
          add: "add",
          update: "update",
          delete: "delete",
          info: "info",
          page: "page"
        },
        pagination: {
          page: "page",
          size: "size"
        },
        search: { 
          keyWord: "keyWord",
          query: "query"
        },
        sort: {
          order: "order",
          prop: "prop"
        },
        label: locale.zhCn,
      },
      style: {},
      events: {},
      render: {
        autoHeight: true,
        functionSlots: {
          exclude: ["el-date-picker", "el-cascader", "el-time-select"]
        }
      }
    };

    // 合并配置
    const config = deepMerge(defaultConfig, options || {});

    // 初始化事件
    if (config.events) {
      emitter.init(config.events);
    }
    
    // 提供全局配置
    app.provide("globalOptions", config);

    // 临时
    temp.set("__crudApp__", app);

    // 浏览器信息
    useBrowser(app);

		// 设置组件
		useComponent(app);

    return {
      name: "cl-crud"
    };
  }
};

export default Crud;

export * from "./emitter";
export * from "./hooks/crud";
export * from "./hooks/plugins";