import SvgIcon from "./SvgIcon.vue";
import type {App,Component} from 'vue'

const global_components:{[key:string]:Component} = {
    SvgIcon
}

export default {
    install(app:App){
       Object.keys(global_components).forEach((key)=>{
        app.component(key,global_components[key]);
       })
    }
}