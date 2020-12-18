<template>
  <div class="home">
    <div class="home-banner">
      <el-carousel :interval="5000" height="660px">
        <el-carousel-item v-for="(item,index) in carouselImgs" :key="index">
          <img style="width:1440px;" :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-search">
      <el-input placeholder="搜索公司或职位" v-model="homeSearch" class="input-with-select">
        <el-select v-model="positionOrcompany" slot="prepend" placeholder="请选择">
          <el-option
            v-for="(item,index) in perList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" @click="jobList()" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="home-company">
      <div>
        <img src="../assets/images/home-company.png" class="img-nav" />
        <img src="../assets/images/a1.png" class="img-alt" />
        <img src="../assets/images/a2.png" class="img-alt" />
        <img src="../assets/images/a3.png" class="img-alt" />
        <img src="../assets/images/a4.png" class="img-alt" />
      </div>
      <div style="margin:-4px 0 0 0">
        <img src="../assets/images/a5.png" class="img-alt" />
        <img src="../assets/images/a6.png" class="img-alt" />
        <img src="../assets/images/a7.png" class="img-alt" />
        <img src="../assets/images/a8.png" class="img-alt" />
        <img src="../assets/images/a9.png" class="img-alt" />
        <img src="../assets/images/a10.png" class="img-alt" />
      </div>
      <div style="margin:-4px 0 0 0">
        <img src="../assets/images/a11.png" class="img-alt" />
        <img src="../assets/images/a12.png" class="img-alt" />
        <img src="../assets/images/a13.png" class="img-alt" />
        <img src="../assets/images/a14.png" class="img-alt" />
        <img src="../assets/images/a15.png" class="img-alt" />
        <img src="../assets/images/a16.png" class="img-alt" />
      </div>
    </div>
    <div class="home-svg">
      <img src="../assets/images/home-foot.png" class="img-svg" />
    </div>
    <div class="home-position">
      <div class="home-title">
        <img src="../assets/images/home-position.png" />
      </div>
      <div class="home-content">
        <div class="home-card" v-for="(list,index) in newpositionList" :key="index">
          <div class="desc-first" @click="descVnf(list.id)" style="cursor:pointer">
            <span v-if="list.positionName.length > 10">{{list.positionName.substr(0,10) + '...'}}</span>
            <span v-else>{{list.positionName}}</span>
            <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
            <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
          </div>
          <div
            @click="descVnf(list.id)"
            class="desc-second"
            style="cursor:pointer"
            v-if="list.workAgeMax == null"
          >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.catalogCode/100)*100/10000)*10000,parseInt(list.catalogCode/100)*100,list.catalogCode],positionCatalogList)[2]}} | 10年以上 | {{list.degreeMin}}</div>
          <div
            @click="descVnf(list.id)"
            class="desc-second"
            style="cursor:pointer"
            v-else-if="list.workAgeMin == 0"
          >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.catalogCode/100)*100/10000)*10000,parseInt(list.catalogCode/100)*100,list.catalogCode],positionCatalogList)[2]}} | 无工作经验 | {{list.degreeMin}}</div>
          <div
            class="desc-second"
            v-else
            style="cursor:pointer"
          >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.catalogCode/100)*100/10000)*10000,parseInt(list.catalogCode/100)*100,list.catalogCode],positionCatalogList)[2]}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</div>
          <div class="line"></div>
          <div class="desc-third" @click="desc(list.company.id)">
            <img
              v-if="list.company.logoUrl"
              style="width:55px;height:55px;margin:20px 0 0 24px;cursor:pointer;border-radius:28px"
              :src="list.company.logoUrl"
            />
            <img
              v-else
              style="width:55px;height:55px;margin:20px 0 0 24px;border-radius:28px"
              :src="url"
            />
            <div class="third-content">
              <span>{{list.company.companyName}}</span>
              <span
                v-if="list.company.size === '500人以上'"
              >{{list.company.size}} | {{list.company.industrySecondary}}</span>
              <span v-else>{{list.company.size}}人 | {{list.company.industrySecondary}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="home-morePosition">
        <div>
          <el-button @click="morePosition" plain>查看更多</el-button>
        </div>
      </div>
      <div class="home-backGround">
        <div>
          <img src="../assets/images/home-foot.png" class="img-svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { newposition, brief } from "apis/account";
import positionCatalog from "../assets/positionCatalog.json";
export default {
  data() {
    return {
      carouselImgs: [
        require("../assets/images/home-banner1.png"),
        require("../assets/images/home-banner2.png"),
        require("../assets/images/home-banner3.png")
      ],
      newpositionList: [],
      perList: [
        {
          value: "职位",
          label: "职位"
        },
        {
          value: "公司",
          label: "公司"
        }
      ],
      homeSearch: "",
      positionOrcompany: "职位"
    };
  },
  methods: {
    //查看更多
    morePosition() {
      this.$router.push({
        path: "/joblist"
      });
    },
    //搜索
    jobList() {
      this.$router.push({
        path: "/joblist",
        query: {
          homeSearch: this.homeSearch,
          positionOrcompany: this.positionOrcompany
        }
      });
    },
    //职位详情
    desc(id) {
      this.$router.push({
        path: "/position",
        query: {
          id: id
        }
      });
    },
    //公司详情
    descVnf(id) {
      this.$router.push({
        path: "/station",
        query: {
          id: id
        }
      });
    },
    //tabs--最新
    new() {
      let params = {
        pageNum: 1,
        pageSize: 9
      };
      newposition(params)
        .then(res => {
          if (res.data.code == 200) {
            this.newpositionList = res.data.data;
          }
        })
        .catch(error => {});
    }
  },
  created() {
    this.new();
    this.positionCatalogList = positionCatalog.data;
  }
};
</script>

<style lang="stylus">
.home {

  .home-banner {
    img {
      width: 1440px;
      height: auto;
    }
  }

  .home-search {
    width: 700px;
    height: 78px;
    margin: 0 auto;
    box-shadow: 0px 2px 24px 0px rgba(180, 180, 180, 0.4);
    position: relative;
    bottom: 39px;
    z-index 200

    .el-select .el-input {
      width: 120px;
    }

    .el-input__inner {
      height: 78px;
      border: 1px solid #ffffff;
    }

    .el-input-group__append {
      border: 1px solid #fff;
      background: #02B9B8;
      width: 128px;
    }

    .el-icon-search:before {
      content: '\e778';
      color: #ffffff;
      font-weight: bold;
      font-size: 30px;
    }

    .input-with-select .el-input-group__prepend {
      background-color: #fff;
      border: 1px solid #fff;
    }

    .el-input-group--append .el-input__inner {
      font-family: PingFangSC-Regular;
      color: #585858;
      font-size: 20px;
      background: #FFFFFF;
    }
  }

  .home-company {
    margin: 80px 113px 0;

    .img-alt {
      background: #FFFFFF;
      border: 1px solid rgba(238, 238, 238, 1);
      width: 201px;
      height: 182px;
      position: relative;
      z-index: 100;
    }

    .img-nav {
      width: 404px;
      height: 182px;
    }

    .img-nav:hover {
      box-shadow: 0px 0px 0px 0px rgba(222, 222, 222, 100);
    }

    .img-alt:hover {
      z-index: 200;
      position: relative;
      border-bottom: 3px solid #02B9B8;
      margin: -4px 0 0 0;
      box-shadow: 0px 4px 18px 0px rgba(204, 204, 204, 69);
    }
  }

  .home-svg {
    text-align: right;

    .img-svg {
      width: 138px;
      height: 138px;
      position: relative;
      bottom: 69px;
      margin: 0 45px 0 0;
      z-index: 50;
    }
  }

  .home-position {
    background: rgba(2, 185, 184, 0.1);
    width: 100%;
    height: auto;

    .home-title {
      padding: 60px 0 0 0;

      img {
        width: 139px;
        height: auto;
      }
    }

    .home-content {
      width: 1328px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      margin: 18px 0 0 40px;

      .home-card {
        width: 388px;
        height: 224px;
        background: #FFFFFF;
        border: 1px solid rgba(227, 227, 227, 1);
        border-top-left-radius: 20px;
        border-top-right-radius: 25px;
        margin: 40px 0 0 40px;

        .desc-first {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .desc-first span:nth-child(1) {
          margin: 35px 0 0 30px;
          font-family: PingFangSC-Medium;
          color: #454545;
          font-size: 24px;
        }

        .desc-first span:nth-child(2) {
          margin: 35px 30px 0 0;
          font-family: PingFangSC-Medium;
          color: #FF6D4E;
          font-size: 24px;
        }

        .desc-second {
          text-align: left;
          margin: 6px 0 0 30px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #959595;
        }

        .line {
          width: 328px;
          border: 0.5px solid #f5F5F5;
          margin: 20px 30px 0;
        }

        .desc-third {
          display: flex;
          flex-direction: row;

          .third-content {
            display: flex;
            flex-direction: column;
            margin: 0 0 0 10px;
          }

          .third-content span:nth-child(1) {
            text-align: left;
            margin: 20px 0 0 0;
            font-family: PingFangSC-Regular;
            color: #505050;
            font-size: 18px;
          }

          .third-content span:nth-child(2) {
            margin: 5px 0 0 0;
            font-family: PingFangSC-Regular;
            color: #959595;
            font-size: 16px;
            text-align: left;
          }
        }
      }

      .home-card:hover {
        border-bottom: 3px solid #02B9B8;
        box-shadow: 0px 10px 30px 0px rgba(157, 190, 191, 78);
      }
    }

    .home-morePosition {
      padding: 74px 0 33px 0;

      .el-button {
        width: 202px;
        height: 51px;
        border: 1px solid rgba(112, 112, 112, 1);
        font-family: PingFangSC-Medium;
        color: #595959;
        font-size: 18px;
        background: #e5f8f7;
      }
    }
  }

  .home-backGround {
    .img-svg {
      width: 138px;
      height: 138px;
      z-index: 50;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding: 0 0 50px 50px;
    }
  }

  .home-backtop {
    border: 1px solid red;
    height: 30px;
  }
}
</style>