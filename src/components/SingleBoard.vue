<template>
  <div>
    <h2> Your Boards</h2>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="(item,index) in schedules" :key="index" cols="12" sm="3">
            <v-card class="pa-2 ma-1"   outlined  >
              <v-img height="100px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn sloat="activator" icon class="float-right" v-bind="attrs" v-on="on">
                      <v-icon class="white--text">more_vert</v-icon>
                    </v-btn>

                  </template>
                  <v-list>
                    <v-list-item >
                      <v-list-item-title style="cursor: pointer" @click.stop="deleteSchedule(item.id)">Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-spacer></v-spacer>
                <v-card-title class="white--text mt-8" @dblclick="scheduleEdit.mode = (scheduleEdit.mode==false)?item.id:false">
                  <v-text-field type="text" v-if="scheduleEdit.mode==item.id" autofocus
                                v-model="scheduleEdit.name=item.name" @blur="scheduleEdit.mode = false"
                                @keyup.enter="updateSchedule(item.id)"></v-text-field>
                  <p class="ml-3">{{item.name}}</p>

                </v-card-title>

              </v-img>


              <board-card :list="item"></board-card>

            </v-card>

        </v-col>

        <v-col cols="12" sm="3">
          <v-card class="pa-2 ma-1"  outlined  >
            <v-card-title class="blue--text mt-8" @dblclick="scheduleAdd.mode = !scheduleAdd.mode">
              <v-text-field type="text" label="Name" required v-if="scheduleAdd.mode" autofocus
                            v-model="scheduleAdd.name" @blur="scheduleAdd.mode = !scheduleAdd.mode"
                            @keyup.enter="storeSchedule"></v-text-field>
              <p class="ml-3" style="cursor: pointer" v-if="!scheduleAdd.mode">Add schedule ...</p>
            </v-card-title>



          </v-card>
        </v-col>

      </v-row>
    </v-container>

  </div>

</template>

<script>
import BoardCard from'@/components/BoardCard'
    export default {
        name: 'SingleBoard',
        data: () => ({
            board:'',
            schedules:'',
            boardId:'',
            scheduleAdd:{
                name:'',
                mode:false
            },
            scheduleEdit:{
                name:'',
                mode:false,
            },
        }),
        components:{
          'board-card':BoardCard
        },
        methods:{
            storeSchedule(){
                this.scheduleAdd.mode = false;
                axios.post(`${base_url}/schedule/store`,{
                    api_token:_token,
                    name:this.scheduleAdd.name,
                    board_id:this.boardId
                })
                    .then(({data})=>{
                        console.log(data);
                        let newSchedule = data.data.schedule;
                        this.schedules.push(newSchedule);
                        this.scheduleAdd.name='';
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            updateSchedule(id){
                this.scheduleEdit.mode = false;
                axios.put(`${base_url}/schedule/${id}/update`,{
                    api_token:_token,
                    name:this.scheduleEdit.name,
                    board_id:this.boardId
                })
                    .then(({data})=>{
                        console.log(data);
                        this.getBoards();
                        this.scheduleEdit.name='';
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            deleteSchedule(id){
                axios.delete(`${base_url}/schedule/${id}?api_token=${_token}&board_id=${this.boardId}`)
                    .then(({data})=>{
                        console.log(data);
                        this.getBoards();
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            getBoards(){
                axios.get(`${base_url}/boards?api_token=${_token}`)
                    .then(({data})=>{
                        // console.log(data)
                        this.boards=data.data;
                        Event.$emit('boardsLoaded',this.boards);
                        this.getSchedule()
                    })
                    .catch((data)=>{
                        console.log(data);
                        this.$router.push('/login');
                    })
            },
            getSchedule(){
               this.boards.map((data)=>{
                    if(data.id == this.boardId){
                        this.schedules =  data.schedules;
                    }
                })
            },

        },
        created(){
            this.boardId = this.$route.params.board_id;
            this.getBoards();
        },
        beforeRouteUpdate(to,from,next){
            this.boardId = to.params.board_id;
            this.getBoards();
            next();
        },
        mounted(){
        }

    }
</script>
