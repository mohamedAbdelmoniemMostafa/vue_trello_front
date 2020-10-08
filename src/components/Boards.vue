<template>
  <div>
    <h2> Your Boards</h2>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="(item,index) in boards" :key="index" cols="12" sm="4">
          <router-link :to="`/boards/${item.id}`">
            <v-card class="pa-2 ma-1 primary text-center" style="cursor:pointer" dark outlined  >
              {{item.name}}
            </v-card>
          </router-link>

        </v-col>
      </v-row>
    </v-container>

  </div>

</template>

<script>
    import boardsDataMixin from '../mixins/boardsDataMixin'
    export default {
        name: 'Boards',
        data: () => ({
            boards:''
        }),
        mixins:[boardsDataMixin],
        methods:{

        },
        mounted(){
            this.getBoards();
        }

    }
</script>
