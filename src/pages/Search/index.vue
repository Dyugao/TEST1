<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            //分级菜单面包屑
            <li class="with-x" v-if="this.SearchParams.categoryName">
              {{ SearchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            //搜索关键字面包屑
            <li class="with-x" v-if="this.SearchParams.keyword">
              {{ SearchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            //品牌事件面包屑
            <li class="with-x" v-if="this.SearchParams.trademark">
              {{ SearchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            //属性值面包屑
            <li
              class="with-x"
              v-for="(attrValue, index) in SearchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isASC, 'icon-down': isDESC }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isASC, 'icon-down': isDESC }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/Detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :PageNo="SearchParams.pageNo"
            :PageSize="SearchParams.pageSize"
            :total="this.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
import Pagination from "../../components/Pagination/index.vue";
export default {
  name: "Search",
  data() {
    return {
      SearchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "2:asc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
    Pagination,
  },
  //在发送请求之前，参数必须带上，所以要在beforeMount获取参数
  beforeMount() {
    //可以用Object.assign将$route的prams和query参数浅拷贝给SearchParams
    Object.assign(this.SearchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //先测试接口返回的数据是对象还是数组
    //把$store.dispatch请求放在mounted中只能发一次请求，而搜索可以发多次请求，可封装成函数，便可发送多次请求
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //获取商品总数
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    isOne() {
      return this.SearchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.SearchParams.order.indexOf("2") != -1;
    },
    isASC() {
      return this.SearchParams.order.indexOf("asc") != -1;
    },
    isDESC() {
      return this.SearchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    getData() {
      //发送请求需要参数，空对象不行,{}改成SearchParams
      this.$store.dispatch("searchList", this.SearchParams);
    },
    //删除分类的名字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段改为undefined，当前这个字段不会带给服务器
      this.SearchParams.categoryName = undefined;
      this.SearchParams.category1Id = undefined;
      this.SearchParams.category2Id = undefined;
      this.SearchParams.category3Id = undefined;
      //地址栏也需要更改：进行路由跳转
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params)
        this.$router.push({ name: "search", params: this.$route.params });
    },
    removeKeyword() {
      this.SearchParams.keyword = undefined;

      this.getData();

      this.$bus.$emit("clearKeyword");

      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件回调---获取品牌数据
    trademarkInfo(trademark) {
      //整理品牌字段的参数‘ID：品牌名称‘
      this.SearchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getData();
    },
    //删除品牌标签
    removeTrademark() {
      this.SearchParams.trademark = undefined;

      this.getData();
    },
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //确认props里面是否含有重复数据：indexOf
      if (this.SearchParams.props.indexOf(props) == -1) {
        this.SearchParams.props.push(props);

        this.getData();
      }
    },
    removeAttr(index) {
      this.SearchParams.props.splice(index, 1);

      this.getData();
    },
    //升序降序
    changeOrder(flag) {
      let originOrder = this.SearchParams.order;
      let originFlag = this.SearchParams.order.split(":")[0];
      let originSort = this.SearchParams.order.split(":")[1];
      let newOrder = "";
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.SearchParams.order = newOrder;
      this.getData();
    },
    //获取分页子组件传回来的数据
    getPageNo(pageNo) {
      this.SearchParams.pageNo = pageNo;
      this.getData();
    },
  },
  watch: {
    //检测路由信息变化，如果发生变化，再次发起请求
    $route(newVaalue, oldValue) {
      //再次发请求之前整理参数给服务器
      Object.assign(this.SearchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getData();
      //每一次请求完毕应该把相应的1，2，3级分类的id给清空，让他接受下一次的相应1，2，3级分类的id
      this.SearchParams.category1Id = "";
      this.SearchParams.category2Id = "";
      this.SearchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;
              list-style: none;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>