import type { App } from "vue";
import { useComponent } from "./components";
import { useBrowser } from "./hooks";
import temp from "./utils/temp";
import "./static/index.scss";

const Crud = {
  install(app: App, options: Options) {

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