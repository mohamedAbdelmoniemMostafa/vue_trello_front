<template>
    <div>
        <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">
        Today
        </div>

        <v-timeline align-top dense>

            <v-timeline-item v-for="(card,index) in cards" :key="index" small>
                <div>
                <div class="font-weight-normal">
                <strong>{{ card.created_at }}</strong> @{{ card.created_at }}
                </div>
                <div>{{ card.name }}</div>
                </div>
            </v-timeline-item>

        </v-timeline>

        </v-card-text>
    </div>
</template>

<script>
    export default {
        name: "BoardCard",
        props:['list'],
        data(){
            return{
                cards:'',
            }
        },
        methods:{

        },
        created(){
            this.cards = this.list.cards;
        },

    }
</script>

<style scoped>

</style>