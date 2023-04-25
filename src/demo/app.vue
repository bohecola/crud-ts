<template>
  <cl-crud ref="Crud">
    <cl-row>
      <cl-table ref="Table"></cl-table>
    </cl-row>

    <!-- <upsert /> -->
  </cl-crud>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useCrud, useForm, useTable, setFocus } from "@/hooks";
import ColumnT1 from "./column-t1.vue";
import Upsert from "./upsert.vue";

const Crud = useCrud(
  {
    service: "test",
    dict: {
      label: {}
    },
    onDelete(selection, { next }) {
      next({ 
        ids: selection.map((e) => e.id)
      });
    }
  },
  (app) => {
    app.refresh();
  }
);

const options = reactive({
  status: [
    {
      label: "启用",
      type: "success",
      value: 1
    },
    {
      label: "禁用",
      type: "danger",
      value: 0
    }
  ],
  tags: [
    {
      label: "A",
      value: 1
    },
    {
      label: "B",
      value: 2
    },
    {
      label: "C",
      value: 3
    }
  ]
});

const Table = useTable({
  autoHeight: true,
  defaultSort: {
    prop: "status",
    order: "descending"
  },
  columns: [
    {
      type: "selection",
      width: 80,
      reserveSelection: true
    },
    () => {
      return {
        type: "expand",
        prop: "detail"
      };
    },
    {
      label: "用户信息",
      children: [
        {
          label: "编号",
          prop: "id"
        },
        {
          label: "姓名",
          prop: "name"
        }
      ]
    },
    // {
    //   label: "测试",
    //   width: 250,
    //   component: {
    //     vm: ColumnT1
    //   }
    // },
    {
      label: "标签",
      prop: "tags",
      dict: computed(() => {
        return {
          text: false,
          separator: "-",
          options: options.tags
        };
      })
    },
    {
      label: "状态",
      prop: "status",
      dict: computed(() => options.status)
    },
    {
      label: "创建时间",
      prop: "createTime",
      sortable: "desc"
    },
    {
      type: "op",
      width: 350,
      buttons({ scope }) {
        return [
          "info",
          "edit",
          "delete",
          {
            label: "测试",
            hidden: false,
            onClick() {}
          }
        ];
      }
    }
  ]
});

const Form = useForm();

function openForm() {
  Form.value?.open(
    {
      props: {
        disabled: false
      },
      form: {
        user: {
          name: "神仙"
        }
      },
      items: [
        () => {
          return {
            label: "方法",
            prop: "fx",
            component: {
              name: "el-input"
            }
          };
        }
      ],
      on: {
        open(data) {
          // refs.name.focus();
        },
        submit(data, { done, close }) {
          console.log(data);
          close();
        },
        close(action, done) {
					console.log("close action", action);
					done();
        }
      }
    },
    [
      setFocus(),
			({ exposed, onOpen }) => {
				console.log(exposed);
			}
    ]
  );
}
</script>

<style lang="scss">
* {
	padding: 0;
	margin: 0;
}

#app {
	height: 100vh;

	.demo {
		height: 100%;

		.wrap {
			height: 100%;
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;
		}

		.cm {
			li {
				height: 30px;
				width: 200px;
				border-bottom: 1px solid #eee;
			}
		}
	}
}

.dialog {
	height: 100%;
	overflow: auto;
}
</style>