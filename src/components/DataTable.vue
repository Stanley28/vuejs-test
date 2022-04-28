<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>
    <div class="data-table__head">
      <div class="data-table__row data-table__row_not-bordered-btm">
        <div
          v-for="(column, i) in columns"
          :key="column.prop"
          class="data-table__cell data-table__cell_strong"
          :style="getCellStyles(i)">
            {{ column.label }}
        </div>
      </div>
    </div>
    <div class="data-table__body">
      <div
        v-for="row in currentPageRows"
        :key="row.id"
        class="data-table__row"
      >
        <div class="data-table__cell data-table__cell_strong data-table__cell_visible-xs">
          {{ columns[0].label }}
        </div>
        <div class="data-table__cell" :style="getCellStyles(0)">
          {{ row.id }}
        </div>
        <div class="data-table__cell data-table__cell_strong data-table__cell_visible-xs">
          {{ columns[1].label }}
        </div>
        <div class="data-table__cell" :style="getCellStyles(1)">
          {{ formatDate(row.date) }}
        </div>
        <div class="data-table__cell data-table__cell_strong data-table__cell_visible-xs">
          {{ columns[2].label }}
        </div>
        <div class="data-table__cell" :style="getCellStyles(2)">
          {{ row.name }}
        </div>
        <div class="data-table__cell data-table__cell_strong data-table__cell_visible-xs">
          {{ columns[3].label }}
        </div>
        <div class="data-table__cell" :style="getCellStyles(3)">
          {{ formatMoney(row.money) }}
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import formatDate from '@/helpers/formatDate';
import formatMoney from '@/helpers/formatMoney';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },

    currentPageRows() {
      const start = (this.page - 1) * 4;
      return this.rows.slice(start, start + this.pageSize);
    },
  },

  methods: {
    getCellStyles(index) {
      return {
        flexBasis: this.columns[index].width,
      };
    },

    formatDate,

    formatMoney,
  },
};
</script>
