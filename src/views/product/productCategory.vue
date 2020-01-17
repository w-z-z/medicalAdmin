<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-14 16:34:28
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-14 18:01:53
 -->
<template>
  <div id="productCategory">
    <div class="categoryBox">
      <el-tree
        :data="data"
        node-key="id"
        draggable
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 10000;
export default {
  name: "productCategory",
  components: {},
  data() {
    return {
      data: [
        {
          id: 1,
          label: "产品1",
          children: [
            {
              id: 4,
              label: "1-1",
              children: [
                {
                  id: 9,
                  label: "1-1-1"
                },
                {
                  id: 10,
                  label: "1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "产品2",
          children: [
            {
              id: 5,
              label: "2-1"
            },
            {
              id: 6,
              label: "2-2"
            }
          ]
        },
        {
          id: 3,
          label: "产品3",
          children: [
            {
              id: 7,
              label: "3-1"
            },
            {
              id: 8,
              label: "3-2",
              children: [
                {
                  id: 11,
                  label: "3-2-1"
                },
                {
                  id: 12,
                  label: "3-2-2"
                },
                {
                  id: 13,
                  label: "3-2-3"
                }
              ]
            }
          ]
        }
      ],

      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    //添加
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    // 删除
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
  },
};
</script>

<style lang="scss" scoped>
#productCategory {
  .categoryBox {
    background: #fff;
    min-height: 400px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>