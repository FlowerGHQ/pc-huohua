<template>
  <!-- 合并单元格合并行 -->
  <div class="table">
    <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%">
      <el-table-column v-for="(item, i) in tableLabel" :label="item" :key="i">
        <template slot-scope="{ row }">{{ row[i].mergeText }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const oneArray = new Map()
export default {
  name: 'Table',
  data() {
    return {
      tableLabel: ['第一个', '第二个', '第三个'],
      tableData: [
        [
          {
            mergeField: '1',
            mergeText: '三年一班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '1',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '2',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          }
          // {
          //   mergeField: '2',
          //   mergeText: '三年二班',
          //   name: '小明',
          //   subjects: '语文',
          //   score: 80
          // }
        ],
        [
          {
            mergeField: '1',
            mergeText: '三年一班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '1',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '2',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          }
        ],
        [
          {
            mergeField: '1',
            mergeText: '三年一班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '1',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '2',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          }
        ],
        [
          {
            mergeField: '1',
            mergeText: '三年一班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '1',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          },
          {
            mergeField: '2',
            mergeText: '三年二班',
            name: '小明',
            subjects: '语文',
            score: 80
          }
        ]
      ],
      mergeObj: {},
      tableIndex: 0
    }
  },
  methods: {
    // 要合并该列
    // columnArray = [2,0,1]
    // 每一个column列的索引对应要合并的 {0=>2,1=>0,2=>1}
    // 默认接受四个值 { 当前行的值, 当前列的值, 行的下标, 列的下标 }
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //pos就是记录加到了哪个column的索引 从第几列开始合并
      let pos = 0
      row.forEach((item, i) => {
        if (i === 0) {
          oneArray.set(i, 1)
        } else {
          if (item.mergeField && item.mergeField === row[i - 1].mergeField) {
            oneArray.set(pos, oneArray.get(pos) + 1)
            oneArray.set(i, 0)
          } else {
            oneArray.set(i, 1)
            pos = i
          }
        }
      })
      const role = oneArray.get(columnIndex) > 0 ? 1 : 0
      return {
        rowspan: 1,
        colspan: oneArray.get(columnIndex)
      }
    }
  },
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.table
    height 100vh
    width 100%
    padding 2.5rem
    box-sizing border-box
    /deep/ .el-table__body tr:hover > td
        background-color: #fff;
</style>
