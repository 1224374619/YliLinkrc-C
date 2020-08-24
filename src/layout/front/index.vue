<template>
    <div>
        <customized-nav />
        <main>
            <router-view/>
        </main>
        <div><customized-footer /></div>
    </div>
</template>

<script>
    import CustomizedFooter from 'components/customized-footer.vue';
    import CustomizedNav from 'components/customized-nav.vue';

    export default {
        name: 'layout-front',
        data() {
            return {}
        },
        components: {
            CustomizedFooter,
            CustomizedNav
        },
    }
</script>
<style>
    main{
        width: 1445px;
        margin: auto;
        overflow: auto;
    }
</style>
