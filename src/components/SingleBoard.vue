<template>
  <div>
    <h2> Your Boards</h2>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="(item,index) in schedules" :key="index" cols="12" sm="3">
            <v-card class="pa-2 ma-1"   outlined  >
              <v-img height="100px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">
                <v-card-title class="white--text mt-8">
                  <p class="ml-3">{{item.name}}</p>
                </v-card-title>
              </v-img>

              <board-card :list="item"></board-card>

            </v-card>

        </v-col>

        <v-col cols="12" sm="3">
          <v-card class="pa-2 ma-1"  outlined  >
            <v-card-title class="blue--text mt-8" @dblclick="addSchedule = !addSchedule">
              <v-text-field type="text" label="Name" required v-if="addSchedule" autofocus
                            v-model="scheduleName" @blur="addSchedule = !addSchedule"
                            @keyup.enter="submitSchedule"></v-text-field>
              <p class="ml-3" style="cursor: pointer" v-if="!addSchedule">Add schedule ...</p>
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
            scheduleName:'',
            addSchedule:false
        }),
        components:{
          'board-card':BoardCard
        },
        methods:{
            submitSchedule(){
                this.addSchedule = false;
                axios.post(`${base_url}/schedule/store`,{
                    api_token:_token,
                    name:this.scheduleName,
                    board_id:this.boardId
                })
                    .then(({data})=>{
                        console.log(data);
                        let newSchedule = data.data.schedule;
                        this.schedules.push(newSchedule);
                        this.scheduleName='';
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            closeSchedule(){
              this.scheduleName='';
              this.addSchedule=false;
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
