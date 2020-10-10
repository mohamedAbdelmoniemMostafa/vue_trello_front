<template>
    <div>
        <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">Today</div>

            <v-timeline align-top dense>
                    <draggable v-model="cards" group="cards" @add="onAdd" :sort="false">
                        <v-timeline-item v-for="(card,cardIndex) in cards" :key="cardIndex" small
                                         :listId="list.id" style="cursor: pointer;">

                            <div :card="JSON.stringify(card)" @dblclick="editCard.mode=(editCard.mode==false)?card.id:false">
                                <div>
                                    <div class="font-weight-normal">
                                        <strong>{{ card.created_at }}</strong> @{{ card.created_at }}
                                    </div>
                                    <div>{{ card.name }}</div>
                                </div>
                                <v-text-field type="text"  v-if="editCard.mode==card.id" autofocus
                                              v-model="editCard.name=card.name" @blur="editCard.mode = false"
                                              @keyup.enter="updateCard(card.id,list.id)"></v-text-field>
                            </div>

                        </v-timeline-item>
                    </draggable>

            </v-timeline>

            <v-list dense>
                    <v-list-item class="white" style="cursor: pointer;" @dblclick="addCard.mode = !addCard.mode">
                        <v-list-item-icon>
                            <v-icon>add_circle_outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-text-field type="text" label="Name" required v-if="addCard.mode" autofocus
                                          v-model="addCard.name" @blur="addCard.mode = !addCard.mode"
                                          @keyup.enter="storeCard"></v-text-field>
                            <v-list-item-title v-if="!addCard.mode"> Add Card</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
            </v-list>


        </v-card-text>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: "BoardCard",
        props:['list'],
        data(){
            return{
                cards:'',
                addCard:{
                    name:'',
                    mode:false
                },
                editCard:{
                    name:'',
                    mode:false
                }
            }
        },
        components:{
            draggable
        },
        methods:{
            storeCard(){
                this.addCard.mode = false;
                axios.post(`${base_url}/card/store`,{
                    api_token:_token,
                    name:this.addCard.name,
                    schedule_id:this.list.id
                })
                    .then(({data})=>{
                        console.log(data);
                        let newCard = data.data.card;
                        this.cards.push(newCard);
                        this.addCard.name='';
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            updateCard(cardId,scheduleId){
                this.editCard.mode=false;
                axios.put(`${base_url}/card/${cardId}/update`,{
                    api_token:_token,
                    name:this.editCard.name,
                    schedule_id:scheduleId,
                })
                    .then(({data})=>{
                        console.log(data);
                        this.editCard.name='';
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            deleteCard(cardId,scheduleId){
                axios.delete(`${base_url}/card/${cardId}?api_token=${_token}&schedule_id=${scheduleId}`)
                    .then(({data})=>{
                        console.log(data);
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            },
            onAdd(e){
                let oldList = (e.from.firstChild.getAttribute('listId'));
                let newList = (e.to.firstChild.getAttribute('listId'));
                let card = JSON.parse(e.target.childNodes[e.newDraggableIndex].firstChild.firstChild.getAttribute('card'));
                this.editCard.name = card.name;
                this.updateCard(card.id,newList);
            }
        },
        created(){
            this.cards = this.list.cards;
        },

    }
</script>

<style scoped>

</style>