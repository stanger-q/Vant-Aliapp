import { VantComponent } from "../common/component";
import { button } from "../mixins/button";
import { link } from "../mixins/link";
import { openType } from "../mixins/open-type";
VantComponent({
    classes: ["icon-class", "text-class"],
    mixins: [link, button, openType],
    props: {
        text: String,
        dot: Boolean,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick(event) {
            this.$emit("click", event.detail);
            this.jumpLink();
        }
    }
});
