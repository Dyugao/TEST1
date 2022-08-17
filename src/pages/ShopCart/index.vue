<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="updateChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="`${cartInfo.skuNum}`"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cartInfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck"
        @change="updateAllChecked""/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheck">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalgoods }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/Trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    //数量改变
    handler: throttle(async function (type, disNum, cartInfo) {
      switch (type) {
        case "minus":
          disNum = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "add":
          disNum = 1;
          break;
        //用户输入进来的最终量，如果非法（带有汉字|负数出现），带给服务器数字零
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //属于正常情况（小数：取整）带给服务器的量  用户输进来的-产品的起始个数
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        //如果删除成功再次发请求获取新的数据进行展示
        //代表的是修改成功
        await this.$store.dispatch("getAddOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    //删除产品
    async deleteCartById(cartInfo) {
      try {
        await this.$store.dispatch("getDeleteCartListBySkuId", cartInfo.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改选中状态
    async updateChecked(cartInfo, event) {
      let isChecked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("getUpdateCheckedById", {
          skuId: cartInfo.skuId,
          isChecked: isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    changeChecked(event) {
      if (event.target.checked) {
        this.cartInfoList.map((element) => {
          return element.isChecked == 1;
        });
      }
    },
    async deleteAllCheck() {
      try {
        //通过在这里单次派发actions，再在actions那里多次派发actions
        await this.$store.dispatch("getDeleteAllCheckCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async updateAllChecked(event) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        await this.$store.dispatch("updateAllIsChecked", isChecked);
        this.getData()
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let personalPrice= this.cartInfoList
        .filter((item) => item.isChecked == 1)
        .map((item) => item.skuNum * item.cartPrice)
        if(personalPrice.length>0){
          return personalPrice.reduce((pre, cur) => pre + cur);
        }
        
    },
    totalgoods() {
      return this.cartInfoList.filter((item) => item.isChecked == 1).length;
    },
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  text-align: center;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        height: 100%;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
            margin: 0 auto;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;
          margin: auto;
          text-align: center;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;

            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;

            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;

            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>