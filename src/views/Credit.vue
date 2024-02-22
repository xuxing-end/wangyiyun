<template>
  <div class="credit">
    <hr />
    <div id="head">
      <!--首页区域开始-->
      <ul class="list-unstyled d-flex pb-3 mt-4">
        <li>
          <router-link style="color: #000" to="/"> 首页 </router-link>
        </li>
        <li>&gt;</li>
        <li class="text-muted">云贝卷</li>
      </ul>
      <!--首页区域结束-->
      <div class="d-flex">
        <!--左侧开始-->
        <div style="width:230px">
          <!--我的云贝-->
          <div class="d-flex align-items-center">
            <div class="pb-1 mr-1"><img src="tu/80.png" /></div>
            <h5 class="m-0">我的云贝:</h5>
            <h3 class="ml-1 mb-0" style="color: red">233</h3>
          </div>
          <!--标签页开始-->
          <ul id="leftopt" class="list-unstyled mt-4" style="width:230px">
            <li
              :style="
                leftOptCount == i
                  ? {
                      'background-color': '#f5f5f5',
                      'border-left': '3px solid #d33a31',
                      color: '#000',
                      'font-weight': ' bold',
                    }
                  : {}
              "
              class="pl-4"
              @click="optCount(i)"
              v-for="(t, i) of leftOpt"
              :key="i"
            >
              {{ t.text }}
            </li>
          </ul>
          <!--标签页结束-->
        </div>
        <!--左侧结束-->
        <!--右侧一层开始-->
        <div v-if="leftOptCount == 0" class="ml-5">
          <!--排序区域开始-->
          <ul
            style="font-size:18px;cursor: pointer;"
            class="list-unstyled d-flex mt-2"
          >
            <li
              @click="sortCount(i)"
              :style="rightSortCount == i ? { 'font-weight': 'bold' } : {}"
              class="mr-4"
              v-for="(t, i) of rightSort"
              :key="i"
            >
              {{ t.text }}
            </li>
          </ul>
          <!--排序区域结束-->
          <!--云贝商城区域开始-->
          <div
            id="rightopt"
            class="d-flex flex-wrap text-center justify-content-between"
          >
            <div v-for="(t, i) of shangcheng" :key="i" class="mb-5">
              <img :src="t.img" />
              <p class="m-0">{{ t.text }}</p>
              <p class="m-0">{{ t.price }}云贝</p>
            </div>
          </div>
          <!--云贝商城区域结束-->
        </div>
        <!--右侧一层结束-->
        <!--右侧二层开始-->
        <div
          id="detailsRight2"
          style="width:100%"
          v-else-if="leftOptCount == 1"
          class="ml-5"
        >
          <h5 style="font-weight: bold;" class="mt-2 mb-4">{{ juan.text1 }}</h5>
          <p class="mb-5 text-muted">{{ juan.text2 }}</p>
          <hr class=" position-relative" />
          <p>已使用或已过期的云贝券</p>
          <div class="mt-4"><img :src="juan.img" class="w-100" /></div>
        </div>
        <!--右侧二层结束-->
        <!--右侧三层开始-->
        <div
          id="detailsRight3"
          v-else-if="leftOptCount == 2"
          class="ml-5 w-100"
        >
          <!--三层顶部导航开始-->
          <ul class="list-unstyled d-flex justify-content-between w-100">
            <li>{{ shouzhi.head.left }}</li>
            <li>
              <ul class="list-unstyled d-flex">
                <li class="ml-3" v-for="(t, i) of shouzhi.head.right" :key="i">
                  {{ t.text }}
                </li>
              </ul>
            </li>
          </ul>
          <!--三层顶部导航结束-->
          <!--三层正文开始-->
          <ul class="list-unstyled w-100">
            <li
              class="d-flex justify-content-between px-3"
              v-for="(t, i) of message"
              :key="i"
              :style="i % 2 !== 0 ? { 'background-color': ' #F7F7F7' } : {}"
            >
              <div class="d-flex">
                <p class="mr-3">{{ t.text1 }}</p>
                <p>{{ t.text2 }}</p>
              </div>
              <p style="color:#C40810">{{ t.text3 }}</p>
            </li>
          </ul>
          <!--三层正文结束-->
          <!--三层页码开始-->
          <ul class="list-unstyled d-flex w-50">
            <button
              @click="pageNumber(-1)"
              :disabled="pageCount == 1"
              class="mr-1"
            >
              &lt;上一页
            </button>
            <li
              :style="pageCount == t ? { 'background-color': '#C40810' } : {}"
              v-for="(t, i) of Math.ceil(home.length / 8)"
              :key="i"
            >
              {{ t }}
            </li>
            <button
              @click="pageNumber(+1)"
              :disabled="pageCount == Math.ceil(home.length / 8)"
              class="ml-1"
            >
              下一页&gt;
            </button>
          </ul>
          <!--三层页码结束-->
        </div>
        <!--右侧三层结束-->
        <!--右侧四层首页开始-->
        <div
          id="detailsRight4"
          v-else-if="leftOptCount == 3 && sayId == 0"
          class="ml-5 w-100"
        >
          <!--如何赚云贝-->
          <p style="font-weight: bold;" class="mt-1 mb-4">{{ top.toptext }}</p>
          <!--每日任务区域-->
          <div>
            <h5 class="py-2 pl-4 mb-4">每日任务（0/2）</h5>
            <ul
              class="list-unstyled d-flex text-center w-100  justify-content-between"
            >
              <li>
                <img src="tu/89.png" />
                <p class="m-0">手机端签到</p>
                <div class="d-flex">
                  <img src="tu/91.png" />
                  <p style="color:#D43B32">{{ top.phone }}</p>
                </div>
              </li>
              <li>
                <img src="tu/90.png" />
                <p class="m-0">桌面端签到</p>
                <div class="d-flex">
                  <img src="tu/91.png" />
                  <p style="color:#D43B32">{{ top.computer }}</p>
                </div>
              </li>
            </ul>
          </div>
          <!--任务指导部分-->
          <ul class="list-unstyled mt-5">
            <li
              v-for="(t, i) of botmessage"
              :key="i"
              class="d-flex justify-content-between align-items-center"
            >
              <div class="d-flex">
                <div class="mr-2"><img :src="t.img" /></div>
                <div>
                  <p class="m-0" style="font-weight: bold;">
                    {{ t.text }}（2/5）
                  </p>
                  <p class="m-0" style="color:#999">
                    {{ t.p }}<span style="color:#D33A31">{{ t.span1 }}</span
                    ><span style="color:#D33A31">{{ t.span2 }}</span>
                  </p>
                </div>
              </div>
              <div @click="say(t.id)" style="cursor: pointer;">
                查看详情&nbsp;&gt;
              </div>
            </li>
          </ul>
        </div>
        <!--右侧四层首页结束-->
        <!--右侧四层一楼页面开始-->
        <div
          id="detailsRight4_1"
          v-else-if="leftOptCount == 3 && sayId == 1"
          class="ml-5 w-100"
        >
          <ul class="list-unstyled d-flex rightUl">
            <li @click="sayone" style="cursor: pointer;">赚云贝</li>
            <li class=" text-muted">&gt;</li>
            <li class=" text-muted">新手任务</li>
          </ul>
          <ul class="list-unstyled">
            <li
              class=" d-flex justify-content-between pt-3 pb-5"
              v-for="(t, i) of sayMessage1"
              :key="i"
            >
              <div
                class="d-flex justify-content-between w-50"
                :style="t.state == 1 ? { color: '#999' } : {}"
              >
                <p>{{ t.text1 }}</p>
                <span style="color:#D33A31">{{ t.text2 }}</span>
              </div>
              <div v-if="t.state == 1" class="d-flex">
                <div><img src="tu/96.png" class="pb-2" /></div>
                <p>已完成</p>
              </div>
              <span v-else-if="t.state == 0" class="mt-1">去设置</span>
            </li>
          </ul>
        </div>
        <!--右侧四层一楼页面结束-->
        <!--右侧四层二楼页面开始-->
        <div
          id="detailsRight4_2"
          v-else-if="leftOptCount == 3 && sayId == 2"
          class="ml-5 w-100"
        >
          <ul class="list-unstyled d-flex rightUl">
            <li @click="sayone" style="cursor: pointer;">赚云贝</li>
            <li class=" text-muted">&gt;</li>
            <li class=" text-muted">邀请好友</li>
          </ul>
          <div class="text-center">
            <p>
              好友注册并达到2级， <span style="color:#FFB931">云贝+100</span>
            </p>
            <p>好友等级达到3级， <span style="color:#FFB931">云贝+100</span></p>
            <div @click="invite">立即邀请</div>
            <ul
              class="list-unstyled"
              :style="
                sayMessage2State ? { display: 'block' } : { display: 'none' }
              "
            >
              <li class="d-flex justify-content-between px-3">
                <p>分享</p>
                <span @click="invite">×</span>
              </li>
              <li>
                <ul class="list-unstyled d-flex  justify-content-around">
                  <li
                    style="cursor: pointer;"
                    class="pt-4 mt-2"
                    v-for="(t, i) of sayMessage2"
                    :key="i"
                  >
                    <img :src="t.img" />
                    <p class="mt-2">{{ t.text }}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <ul class="list-unstyled rightUl mt-5 pt-5">
            <li>我的邀请记录</li>
            <div>快去邀请好友吧~</div>
          </ul>
        </div>
        <!--右侧四层二楼页面结束-->
        <!--右侧四层三楼页面开始-->
        <div
          id="detailsRight4_3"
          v-else-if="leftOptCount == 3 && sayId == 3"
          class="ml-5 w-100"
        >
          <ul class="list-unstyled d-flex rightUl">
            <li @click="sayone" style="cursor: pointer;">赚云贝</li>
            <li class=" text-muted">&gt;</li>
            <li class=" text-muted">上传歌词</li>
          </ul>
          <div class="d-flex mt-5" style="margin: 0 auto;width:500px">
            <div class="mr-3"><img src="tu/102.png" alt="" /></div>
            <div>
              <h1 class="mt-3">上传歌词赚云贝</h1>
              <p style="font-size: 20px;color:#9C9E9C" class="mt-4 mb-0">
                每条歌词固定奖励 <span style="color:#D44141">80云贝</span>
              </p>
              <p style="font-size: 20px;color:#9C9E9C" class="mt-2">
                求的人越多，云贝奖励越多。
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-5">
            <h4>求歌词榜TOP100</h4>
            <div class="d-flex">
              <div><img src="tu/103.png" /></div>
              <span style="color:#0C73C2;cursor: pointer;" class="mt-1 ml-1"
                >我上传的歌词</span
              >
            </div>
          </div>
          <div class="">
            <ul class="list-unstyled d-flex m-0">
              <!--offset-1向右偏移一个col单位-->
              <li class="col-3 offset-1">人数</li>
              <li class="col-3">歌曲标题</li>
              <li class="col-3">歌手</li>
              <li class="col-1">操作</li>
              <li class="col-1">状态</li>
            </ul>
            <ul class="list-unstyled small">
              <li
                class="d-flex"
                v-for="(t, i) of sayMessage3"
                :key="i"
                :style="i % 2 != 0 ? { 'background-color': '#F6F6F6' } : {}"
              >
                <p
                  class="col-1"
                  v-for="(t, index) of sayMessage3.length"
                  :key="index"
                  v-show="t == i + 1"
                  style="color:#999"
                >
                  {{ t < 10 ? "0" + t : t }}
                </p>
                <p class="col-3">{{ t.text1 }}</p>
                <p
                  class="col-3"
                  style="overflow: hidden;height:40px;text-overflow:ellipsis;white-space: nowrap;"
                >
                  {{ t.text2 }}
                </p>
                <p class="col-3">{{ t.text3 }}</p>
                <p class="col-1" style="color:#0C73CE">{{ t.text4 }}</p>
                <p class="col-1">{{ t.text5 }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!--右侧四层三楼页面结束-->
        <!--右侧四层四楼页面开始-->
        <div
          id="detailsRight4_4"
          v-else-if="leftOptCount == 3 && sayId == 4"
          class="ml-5 w-100"
        >
          <ul class="list-unstyled d-flex rightUl">
            <li @click="sayone" style="cursor: pointer;">赚云贝</li>
            <li class=" text-muted">&gt;</li>
            <li class=" text-muted">翻译歌词</li>
          </ul>
          <div class="d-flex mt-5" style="margin: 0 auto;width:500px">
            <div class="mr-3"><img src="tu/102.png" alt="" /></div>
            <div>
              <h1 class="mt-3">翻译歌词赚云贝</h1>
              <p style="font-size: 20px;color:#9C9E9C" class="mt-4 mb-0">
                每条翻译固定奖励 <span style="color:#D44141">200云贝</span>
              </p>
              <p style="font-size: 20px;color:#9C9E9C" class="mt-2">
                求的人越多，云贝奖励越多。
              </p>
            </div>
          </div>
          <p class="small text-center ml-2 mt-4 text-muted">
            在每首歌曲的单曲页，选择“翻译歌词”，贡献你的歌词，审核通过就可以获得相应云贝。
          </p>
          <div class="d-flex justify-content-between mt-5">
            <div class="d-flex">
              <h4>求翻歌词榜TOP100</h4>
              <ul class="list-unstyled d-flex">
                <li
                  style="cursor: pointer;"
                  :style="
                    sayMessage3Badge == '欧美' ? { 'font-weight': ' bold' } : {}
                  "
                  @click="om"
                >
                  欧美
                </li>
                <li>|</li>
                <li
                  style="cursor: pointer;"
                  :style="
                    sayMessage3Badge == '日语' ? { 'font-weight': ' bold' } : {}
                  "
                  @click="ry"
                >
                  日语
                </li>
                <li>|</li>
                <li
                  style="cursor: pointer;"
                  :style="
                    sayMessage3Badge == '韩语' ? { 'font-weight': ' bold' } : {}
                  "
                  @click="hy"
                >
                  韩语
                </li>
              </ul>
            </div>
            <div class="d-flex">
              <div><img src="tu/103.png" /></div>
              <span style="color:#0C73C2;cursor: pointer;" class="mt-1 ml-1"
                >我翻译的歌词</span
              >
            </div>
          </div>
          <div class="">
            <ul class="list-unstyled d-flex m-0">
              <!--offset-1向右偏移一个col单位-->
              <li class="col-3 offset-1">人数</li>
              <li class="col-3">歌曲标题</li>
              <li class="col-3">歌手</li>
              <li class="col-1">操作</li>
              <li class="col-1">状态</li>
            </ul>
            <ul class="list-unstyled small">
              <li
                class="d-flex"
                v-for="(t, i) of sayMessage4"
                :key="i"
                :style="i % 2 != 0 ? { 'background-color': '#F6F6F6' } : {}"
              >
                <p
                  class="col-1"
                  v-for="(t, index) of sayMessage4.length"
                  :key="index"
                  v-show="i == index"
                  style="overflow: hidden;height:40px;text-overflow:ellipsis;white-space: nowrap;color:#999"
                >
                  {{ t < 10 ? "0" + t : t }}
                </p>
                <p class="col-3">{{ t.text1 }}</p>
                <p class="col-3">{{ t.text2 }}</p>
                <p class="col-3">{{ t.text3 }}</p>
                <p class="col-1" style="color:#0C73C2">{{ t.text4 }}</p>
                <p
                  class="col-1"
                  :style="t.text5 == '无提交' ? { color: '#999' } : {}"
                >
                  {{ t.text5 }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!--右侧四层四楼页面结束-->
        <!--右侧四层五楼页面开始-->
        <div
          id="detailsRight4_5"
          v-else-if="leftOptCount == 3 && sayId == 5"
          class="ml-5 w-100"
        >
          <ul class="list-unstyled d-flex rightUl">
            <li @click="sayone" style="cursor: pointer;">赚云贝</li>
            <li class=" text-muted">&gt;</li>
            <li class=" text-muted">用户等级升级</li>
          </ul>
          <ul class="list-unstyled">
            <li
              class="d-flex justify-content-between"
              v-for="(t, i) of sayMessage5"
              :key="i"
              :style="t.state == 1 ? {} : { opacity: '.5' }"
            >
              <p>
                {{ t.text1 }}
                <span style="color:#DF5A47;font-weight: bold;">{{
                  t.span
                }}</span>
              </p>
              <p>{{ t.text2 }}</p>
              <div class="d-flex" v-if="t.state == 1">
                <div><img class="pb-1" src="tu/104.png" /></div>
                <p>已达成</p>
              </div>
              <div class="d-flex" v-else>
                <div><img class="pb-1" src="tu/105.png" /></div>
                <p>未达成</p>
              </div>
            </li>
          </ul>
        </div>
        <!--右侧四层五楼页面结束-->
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";
export default {
  components: { Foot },
  data() {
    return {
      //左侧原则内容数据
      leftOpt: [],
      //左侧选择用的变量
      leftOptCount: 0,
      //右侧排序数据内容
      rightSort: [],
      //右侧排序用的变量
      rightSortCount: 0,
      //右侧云贝商城的数据内容
      shangcheng: [],
      //右侧云贝卷的数据内容
      juan: {},
      //右侧收支的数据内容
      shouzhi: { head: { left: "" } },
      //分页页码
      one: 0,
      two: 8,
      //用来页码切换时进行对比
      pageCount: 1,
      //接受当前的页面数据
      message: [],
      //接受收支明细所有数据
      home: [],
      //接受如何赚云贝数据
      top: {},
      botmessage: [],
      //接受如何赚云贝中的Id
      sayId: "",
      //赚云贝1的内容
      sayMessage1: [],
      //赚云贝2的内容
      sayMessage2: [],
      sayMessage2State: false,
      //赚云贝3的内容
      sayMessage3: [],
      //赚云贝4的标记
      sayMessage3Badge: "欧美",
      //赚云贝4的内容
      sayMessage4: [],
      //赚云贝5的内容
      sayMessage5: [],
    };
  },
  methods: {
    say(i) {
      this.sayId = i;
      if (i == 1) {
        this.axios
          .get("/credit", {
            params: {
              name: "如何赚云贝",
              id: 1,
            },
          })
          .then((result) => {
            this.sayMessage1 = result.data[0].message;
            console.log(this.sayMessage1);
          });
      } else if (i == 2) {
        this.axios
          .get("/credit", {
            params: {
              name: "如何赚云贝",
              id: 2,
            },
          })
          .then((result) => {
            this.sayMessage2 = result.data[0].shares;
          });
      } else if (i == 3) {
        this.axios
          .get("/credit", {
            params: {
              name: "如何赚云贝",
              id: 3,
            },
          })
          .then((result) => {
            this.sayMessage3 = result.data[0].message;
          });
      } else if (i == 4) {
        if (this.sayMessage3Badge == "欧美") {
          this.axios
            .get("/credit", {
              params: {
                name: "如何赚云贝",
                id: 4,
              },
            })
            .then((result) => {
              this.sayMessage4 = result.data[0].message_1;
            });
        } else if (this.sayMessage3Badge == "日语") {
          this.axios
            .get("/credit", {
              params: {
                name: "如何赚云贝",
                id: 4,
              },
            })
            .then((result) => {
              this.sayMessage4 = result.data[0].message_2;
            });
        } else if (this.sayMessage3Badge == "韩语") {
          this.axios
            .get("/credit", {
              params: {
                name: "如何赚云贝",
                id: 4,
              },
            })
            .then((result) => {
              this.sayMessage4 = result.data[0].message_3;
            });
        }
      } else if (i == 5) {
        this.axios
          .get("/credit", {
            params: {
              name: "如何赚云贝",
              id: 5,
            },
          })
          .then((result) => {
            this.sayMessage5 = result.data[0].message;
          });
      }
    },
    sayone() {
      this.sayId = 0;
    },
    pageNumber(n) {
      this.pageCount += n;
      if (n > 0) {
        this.one = this.two;
        this.two = this.two + 8;
      } else {
        this.two = this.one;
        this.one = this.one - 8;
      }
      this.axios
        .get("/credit", {
          params: {
            name: "收支明细",
          },
        })
        .then((result) => {
          this.home = result.data[0].home;
          this.message = result.data[0].home.slice(this.one, this.two);
        });
    },
    sortCount(i) {
      this.rightSortCount = i;
      if (i == 0) {
        this.axios
          .get("/credit", {
            params: {
              name: "云贝商城",
            },
          })
          .then((result) => {
            this.shangcheng = result.data[0].home;
          });
      } else if (i == 1) {
        this.axios
          .get("/credit", {
            params: {
              name: "云贝商城",
            },
          })
          .then((result) => {
            let count = result.data[0].home;
            this.shangcheng = count.sort((a, b) => a.price - b.price);
          });
      } else if (i == 2) {
        this.axios
          .get("/credit", {
            params: {
              name: "云贝商城",
            },
          })
          .then((result) => {
            let count = result.data[0].home;
            this.shangcheng = count.sort((a, b) => b.price - a.price);
          });
      }
    },
    optCount(i) {
      this.leftOptCount = i;
      if (i == 0) {
        this.axios
          .get("/credit", {
            params: {
              name: "云贝商城",
            },
          })
          .then((result) => {
            this.shangcheng = result.data[0].home;
          });
      } else if (i == 1) {
        this.axios
          .get("/credit", {
            params: {
              name: "云贝卷",
            },
          })
          .then((result) => {
            this.juan = result.data[0];
          });
      } else if (i == 2) {
        this.axios
          .get("/credit", {
            params: {
              name: "收支明细",
            },
          })
          .then((result) => {
            this.shouzhi = result.data[0];
            this.home = result.data[0].home;
            this.message = result.data[0].home.slice(this.one, this.two);
          });
      } else if (i == 3) {
        this.axios
          .get("/credit", {
            params: {
              name: "如何赚云贝",
              id: 0,
            },
          })
          .then((result) => {
            this.top = result.data[0].top;
            this.botmessage = result.data[0].botmessage;
            this.sayId = result.data[0].id;
          });
      }
    },
    invite() {
      this.sayMessage2State = !this.sayMessage2State;
    },
    om() {
      (this.sayMessage3Badge = "欧美"), this.say(4);
    },
    ry() {
      (this.sayMessage3Badge = "日语"), this.say(4);
    },
    hy() {
      (this.sayMessage3Badge = "韩语"), this.say(4);
    },
  },
  mounted() {
    this.axios.get("/credit").then((result) => {
      this.leftOpt = result.data[0].text;
      this.rightSort = result.data[0].sort;
    });
    this.axios
      .get("/credit", {
        params: {
          name: "云贝商城",
        },
      })
      .then((result) => {
        this.shangcheng = result.data[0].home;
      });
  },
};
</script>
<style>
.credit #head {
  width: 77%;
  margin: 0 auto;
}
.credit #head > ul:first-child {
  font-size: 18px;
  border-bottom: 1px solid #000;
}
.credit #head > ul:first-child li {
  margin-right: 10px;
}
.credit #leftopt {
  font-size: 20px;
}
.credit #leftopt > li {
  height: 40px;
  border-radius: 5px;
  line-height: 40px;
  cursor: pointer;
  color: #888888;
}
.credit #rightopt {
  width: 80%;
  font-size: 12px;
}
.credit #rightopt > div {
  width: 30%;
}
.credit #detailsRight2 > p:nth-child(4) {
  position: absolute;
  background-color: #fff;
  transform: translate(356px, -31px);
}
.credit #detailsRight3 > ul:nth-child(2) {
  border: 1px solid #888888;
  margin-top: 20px;
}
.credit #detailsRight3 > ul:nth-child(2) > li {
  height: 50px;
  line-height: 50px;
}
.credit #detailsRight3 > ul:nth-child(3) {
  margin: 0 auto;
  width: "";
}
.credit #detailsRight3 > ul:nth-child(3) > li {
  width: 40px;
  height: 40px;
  background-color: #888888;
  text-align: center;
  line-height: 40px;
  color: #fff;
  cursor: pointer;
}
.credit #detailsRight3 > ul:nth-child(3) > li + li {
  margin-left: 10px;
}
.credit #detailsRight3 > ul:nth-child(3) > button {
  border: 1px solid #888;
  outline: none;
  cursor: pointer;
}
.credit #detailsRight4 > div:nth-child(2) > ul:nth-child(2) > li {
  width: 50%;
}
.credit #detailsRight4 > div:nth-child(2) > ul:nth-child(2) > li:first-child {
  border-right: 1px solid #e5e5e5;
}
.credit #detailsRight4 > div:nth-child(2) > ul:nth-child(2) > li > div {
  width: 35px;
  margin: 0 auto;
}
.credit #detailsRight4 > div:nth-child(2) > ul:nth-child(2) > li > div > img {
  height: 25px;
}
.credit #detailsRight4 > div:nth-child(2) > h5 {
  background-color: #e5e5e5;
  color: #999;
  font-size: 15px;
}
.credit #detailsRight4 > div:nth-child(2) {
  border: 1px solid #f4f4f4;
}
.credit #detailsRight4 > ul:nth-child(3) > li > div:last-child {
  border: 1px solid #999;
  height: 30px;
  width: 100px;
  text-align: center;
}
.credit #detailsRight4 > ul:nth-child(3) > li {
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 15px;
  margin-top: 20px;
}
.credit .rightUl {
  height: 35px;
  line-height: 35px;
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 45px;
  margin-bottom: 0;
}
.credit .rightUl > li {
  margin-right: 5px;
}
.credit #detailsRight4_1 > ul:nth-child(2) > li {
  border-bottom: 2px solid #f4f4f4;
  height: 35px;
  line-height: 35px;
}
.credit #detailsRight4_1 > ul:nth-child(2) > li > span:last-child {
  background-color: #328ad4;
  width: 74px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.credit #detailsRight4_1 p {
  margin: 0;
}
.credit #detailsRight4_2 > ul:first-child {
  border: 0;
}
.credit #detailsRight4_2 > div:nth-child(2) {
  position: relative;
}
.credit #detailsRight4_2 > div:nth-child(2) > div {
  background-color: #ffb931;
  width: 210px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
}
.credit #detailsRight4_2 > div:nth-child(2) > div:hover {
  background-color: #f5ac1a;
}
.credit #detailsRight4_2 > div:nth-child(2) > ul {
  width: 580px;
  height: 240px;
  background-color: #fff;
  position: absolute;
}
.credit #detailsRight4_2 > div:nth-child(2) > ul > li:first-child {
  height: 60px;
  line-height: 60px;
  color: #6f6f6f;
  background-color: #f6f6f6;
  font-size: 18px;
}
.credit #detailsRight4_2 > div:nth-child(2) > ul > li:first-child > span {
  font-size: 40px;
  cursor: pointer;
}
.credit #detailsRight4_2 > div:nth-child(2) > ul:nth-child(4) {
  box-shadow: 0px 0px 10px 1px #999;
}
.credit #detailsRight4_2 > ul:nth-child(3) > div:nth-child(2) {
  height: 400px;
  overflow: hidden;
  line-height: 400px;
  float: left;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 25px;
}
.credit #detailsRight4_3 > ul:first-child {
  border: 0;
}
.credit #detailsRight4_3 > div:nth-child(3) {
  border-bottom: 2px solid #d44141;
}
.credit #detailsRight4_3 > div:nth-child(4) > ul:first-child {
  background-color: #f6f6f6;
  border: 1px solid #d9d9d9;
  border-top: 0;
  width: 100%;
  padding: 0;
  height: 40px;
  line-height: 40px;
}
.credit #detailsRight4_3 > div:nth-child(4) > ul:nth-child(2) {
  border: 1px solid #d9d9d9;
  border-top: 0;
}
.credit #detailsRight4_3 > div:nth-child(4) > ul:nth-child(2) > li {
  overflow: hidden;
  height: 40px;
  line-height: 40px;
}
.credit #detailsRight4_4 > div:nth-child(4) {
  border-bottom: 2px solid #d44141;
}
.credit
  #detailsRight4_4
  > div:nth-child(4)
  > div:first-child
  > ul:nth-child(2) {
  transform: translateY(3px);
  margin-left: 10px;
}
.credit
  #detailsRight4_4
  > div:nth-child(4)
  > div:first-child
  > ul:nth-child(2)
  > li {
  margin: 0 5px;
}
.credit #detailsRight4_4 > div:nth-child(5) > ul:first-child {
  background-color: #f6f6f6;
  border: 1px solid #d9d9d9;
  border-top: 0;
  width: 100%;
  padding: 0;
  height: 40px;
  line-height: 40px;
}
.credit #detailsRight4_4 > div:nth-child(5) > ul:nth-child(2) {
  border: 1px solid #d9d9d9;
  border-top: 0;
}
.credit #detailsRight4_4 > div:nth-child(5) > ul:nth-child(2) > li {
  height: 35px;
  line-height: 35px;
}
.credit #detailsRight4_4 > div:nth-child(5) > ul:nth-child(2) p {
  margin: 0;
}
.credit #detailsRight4_5 > ul:nth-child(2) > li p {
  margin: 0;
}
.credit #detailsRight4_5 > ul:nth-child(2) > li {
  border-bottom: 1px solid #f4f4f4;
  height: 50px;
  line-height: 50px;
}
</style>
