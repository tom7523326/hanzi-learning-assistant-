// 从 localStorage 加载数据
let characters = JSON.parse(localStorage.getItem('characters')) || [];

// 安全的 localStorage 操作
function safeLocalStorageGet(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`读取 ${key} 失败:`, error);
    return defaultValue;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`保存 ${key} 失败:`, error);
    return false;
  }
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 消息提示系统
function showMessage(text, type = 'info', duration = 3000) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, duration);
}

// 添加滑出动画
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(slideOutStyle);

// 课文1-25词组和拼音，分组
const lessons = [
  {
    title: "课文1",
    words: [
      { pinyin: "shī gē", word: "诗歌" },
      { pinyin: "chèn jī", word: "趁机" },
      { pinyin: "tóng nián", word: "童年" },
      { pinyin: "bì lǜ", word: "碧绿" },
      { pinyin: "sī jīn", word: "丝巾" },
      { pinyin: "huà zhuāng", word: "化妆" },
      { pinyin: "jiǎn dāo", word: "剪刀" }
    ]
  },
  {
    title: "课文2",
    words: [
      { pinyin: "zǐ xì", word: "仔细" },
      { pinyin: "xún zhǎo", word: "寻找" },
      { pinyin: "gū niang", word: "姑娘" },
      { pinyin: "liǔ zhī", word: "柳枝" },
      { pinyin: "táo huā", word: "桃花" },
      { pinyin: "xìng huā", word: "杏花" },
      { pinyin: "chōng shuǐ", word: "冲水" },
      { pinyin: "tǔ sī", word: "吐丝" },
      { pinyin: "chūn tiān", word: "春天" },
      { pinyin: "yě huā", word: "野花" },
      { pinyin: "dàng qiū qián", word: "荡秋千" }
    ]
  },
  {
    title: "课文3",
    words: [
      { pinyin: "xiān huā", word: "鲜花" },
      { pinyin: "yuán lái", word: "原来" },
      { pinyin: "dà shū", word: "大叔" },
      { pinyin: "yóu jú", word: "邮局" },
      { pinyin: "zuò kè", word: "做客" },
      { pinyin: "jīng qí", word: "惊奇" },
      { pinyin: "kuài huó", word: "快活" },
      { pinyin: "měi hǎo", word: "美好" },
      { pinyin: "lǐ wù", word: "礼物" },
      { pinyin: "tǔ duī", word: "土堆" },
      { pinyin: "rèn zhēn", word: "认真" },
      { pinyin: "yóu dí yuán", word: "邮递员" }
    ]
  },
  {
    title: "课文4",
    words: [
      { pinyin: "zhí shù", word: "植树" },
      { pinyin: "gé wài", word: "格外" },
      { pinyin: "hàn zhū", word: "汗珠" },
      { pinyin: "xiū xi", word: "休息" },
      { pinyin: "shù miáo", word: "树苗" },
      { pinyin: "bǐ zhí", word: "笔直" },
      { pinyin: "mǎn yì", word: "满意" },
      { pinyin: "dèng yé ye", word: "邓爷爷" },
      { pinyin: "bì kǒng rú xǐ", word: "碧空如洗" },
      { pinyin: "wàn lǐ wú yún", word: "万里无云" },
      { pinyin: "yǐn rén zhù mù", word: "引人注目" }
    ]
  },
  {
    title: "课文5",
    words: [
      { pinyin: "shū shu", word: "叔叔" },
      { pinyin: "zú jì", word: "足迹" },
      { pinyin: "zuó tiān", word: "昨天" },
      { pinyin: "mí lù", word: "迷路" },
      { pinyin: "wēn nuǎn", word: "温暖" },
      { pinyin: "ài xīn", word: "爱心" },
      { pinyin: "chōng fēng", word: "冲锋" },
      { pinyin: "shōu liú", word: "收留" },
      { pinyin: "wān qū", word: "弯曲" },
      { pinyin: "bèi bāo", word: "背包" },
      { pinyin: "sǎ shuǐ", word: "洒水" },
      { pinyin: "dǐng fēng mào yǔ", word: "顶风冒雨" }
    ]
  },
  {
    title: "课文6",
    words: [
      { pinyin: "zhuō zi", word: "桌子" },
      { pinyin: "nán dào", word: "难道" },
      { pinyin: "wèi dào", word: "味道" },
      { pinyin: "jiù shì", word: "就是" },
      { pinyin: "nóng jù", word: "农具" },
      { pinyin: "tián cài", word: "田菜" },
      { pinyin: "gōng jù", word: "工具" },
      { pinyin: "láo dòng", word: "劳动" },
      { pinyin: "jīng guò", word: "经过" },
      { pinyin: "cái néng", word: "才能" },
      { pinyin: "mǎi shū", word: "买书" },
      { pinyin: "gǎn tián", word: "赶田" },
      { pinyin: "yě xǔ", word: "也许" }
    ]
  },
  {
    title: "课文7",
    words: [
      { pinyin: "chū sè", word: "出色" },
      { pinyin: "bō wén", word: "波纹" },
      { pinyin: "hǎo xiàng", word: "好像" },
      { pinyin: "hé àn", word: "河岸" },
      { pinyin: "jǐng sè", word: "景色" },
      { pinyin: "liǔ shù", word: "柳树" },
      { pinyin: "mèi mei", word: "妹妹" },
      { pinyin: "zhī tiáo", word: "枝条" },
      { pinyin: "yāo qiú", word: "要求" },
      { pinyin: "fēi cháng", word: "非常" },
      { pinyin: "yì pǐ mǎ", word: "一匹马" },
      { pinyin: "liàn liàn bù shě", word: "恋恋不舍" }
    ]
  },
  {
    title: "识字1",
    words: [
      { pinyin: "shén zhōu", word: "神州" },
      { pinyin: "zhōng huá", word: "中华" },
      { pinyin: "shān chuān", word: "山川" },
      { pinyin: "huáng hé", word: "黄河" },
      { pinyin: "cháng jiāng", word: "长江" },
      { pinyin: "cháng chéng", word: "长城" },
      { pinyin: "mín zú", word: "民族" },
      { pinyin: "fèn fā", word: "奋发" },
      { pinyin: "qíng yì", word: "情谊" },
      { pinyin: "tái wān dǎo", word: "台湾岛" },
      { pinyin: "gè zhǒng gè yàng", word: "各种各样" },
      { pinyin: "bǎi huā qí fàng", word: "百花齐放" }
    ]
  },
  {
    title: "识字2",
    words: [
      { pinyin: "zhāng tiē", word: "张贴" },
      { pinyin: "jiē dào", word: "街道" },
      { pinyin: "huā dēng", word: "花灯" },
      { pinyin: "xiān rén", word: "仙人" },
      { pinyin: "ài cǎo", word: "艾草" },
      { pinyin: "lóng zhōu", word: "龙舟" },
      { pinyin: "jìng ài", word: "敬爱" },
      { pinyin: "zhōng qiū", word: "中秋" },
      { pinyin: "zhuǎn yí", word: "转移" },
      { pinyin: "rè nào", word: "热闹" },
      { pinyin: "tuán yuán", word: "团圆" },
      { pinyin: "qīng míng jié", word: "清明节" }
    ]
  },
  {
    title: "识字3",
    words: [
      { pinyin: "dòng wù", word: "动物" },
      { pinyin: "bèi ké", word: "贝壳" },
      { pinyin: "zì jǐ", word: "自己" },
      { pinyin: "kě yǐ", word: "可以" },
      { pinyin: "qǐán bì", word: "钱币" },
      { pinyin: "shēn tǐ", word: "身体" },
      { pinyin: "qián cái", word: "钱财" },
      { pinyin: "yǒu guān", word: "有关" },
      { pinyin: "bǐ rú", word: "比如" },
      { pinyin: "gòu mǎi", word: "购买" },
      { pinyin: "yǔ zhòng bù tóng", word: "与众不同" },
      { pinyin: "jiǎ gǔ wén", word: "甲骨文" }
    ]
  },
  {
    title: "识字4",
    words: [
      { pinyin: "měi shí", word: "美食" },
      { pinyin: "hóng shāo", word: "红烧" },
      { pinyin: "qié zi", word: "茄子" },
      { pinyin: "kǎo yā", word: "烤鸭" },
      { pinyin: "yáng ròu", word: "羊肉" },
      { pinyin: "xiǎo jī", word: "小鸡" },
      { pinyin: "dàn chǎo fàn", word: "蛋炒饭" }
    ]
  },
  {
    title: "课文8",
    words: [
      { pinyin: "cǎi sè", word: "彩色" },
      { pinyin: "jiāo jiān", word: "交接" },
      { pinyin: "sēn lín", word: "森林" },
      { pinyin: "xuě sōng", word: "雪松" },
      { pinyin: "gē shēng", word: "歌声" },
      { pinyin: "píng guǒ", word: "苹果" },
      { pinyin: "jīng líng", word: "精灵" },
      { pinyin: "jì jié", word: "季节" },
      { pinyin: "mèng xiǎng", word: "梦想" },
      { pinyin: "lā shǒu", word: "拉手" },
      { pinyin: "yì bān", word: "一般" },
      { pinyin: "kāi huā jiē guǒ", word: "开花结果" }
    ]
  },
  {
    title: "课文9",
    words: [
      { pinyin: "chēng hū", word: "称呼" },
      { pinyin: "shuō huà", word: "说话" },
      { pinyin: "tóng huà", word: "童话" },
      { pinyin: "ā yí", word: "阿姨" },
      { pinyin: "duì àn", word: "对岸" },
      { pinyin: "dì di", word: "弟弟" },
      { pinyin: "yóu xì", word: "游戏" },
      { pinyin: "fā míng", word: "发明" },
      { pinyin: "zì mù", word: "字母" },
      { pinyin: "fā xiàn", word: "发现" },
      { pinyin: "fāng biàn", word: "方便" },
      { pinyin: "jiāo shū", word: "教书" },
      { pinyin: "tài yáng sǎn", word: "太阳伞" }
    ]
  },
  {
    title: "课文10",
    words: [
      { pinyin: "zhōu wéi", word: "周围" },
      { pinyin: "bǔ chōng", word: "补充" },
      { pinyin: "gōng zhǔ", word: "公主" },
      { pinyin: "dì dào", word: "地道" },
      { pinyin: "huǒ yào", word: "火药" },
      { pinyin: "huǒ bàn", word: "伙伴" },
      { pinyin: "wàng jì", word: "忘记" },
      { pinyin: "yǔ jù", word: "语句" },
      { pinyin: "hé lì", word: "合理" },
      { pinyin: "sǐ wáng", word: "死亡" }
    ]
  },
  {
    title: "课文11",
    words: [
      { pinyin: "pì gǔ", word: "屁股" },
      { pinyin: "cāng ěr", word: "苍耳" },
      { pinyin: "liú shén", word: "留神" },
      { pinyin: "gǎn jìng", word: "干净" },
      { pinyin: "dà shěn", word: "大婶" },
      { pinyin: "xìng yùn", word: "幸运" },
      { pinyin: "shí jìn", word: "使劲" },
      { pinyin: "zǒng xiǎng", word: "总想" },
      { pinyin: "yè wǎn", word: "夜晚" },
      { pinyin: "cǎo dì", word: "草地" },
      { pinyin: "zhǐ shì", word: "只是" },
      { pinyin: "kuài lè", word: "快乐" }
    ]
  },
  {
    title: "课文12",
    words: [
      { pinyin: "quàn gào", word: "劝告" },
      { pinyin: "míng bái", word: "明白" },
      { pinyin: "zuān jìn", word: "钻进" },
      { pinyin: "diū shī", word: "丢失" },
      { pinyin: "hé miáo", word: "禾苗" },
      { pinyin: "jīn pí lì jìn", word: "筋疲力尽" },
      { pinyin: "wáng yáng bǔ láo", word: "亡羊补牢" }
    ]
  },
  {
    title: "课文13",
    words: [
      { pinyin: "tú huà", word: "图画" },
      { pinyin: "zuò wèi", word: "座位" },
      { pinyin: "shén qíng", word: "神情" },
      { pinyin: "jiāo dù", word: "角度" },
      { pinyin: "kè běn", word: "课本" },
      { pinyin: "bǎi fàng", word: "摆放" },
      { pinyin: "jiāo wǎng", word: "交往" },
      { pinyin: "shū yè", word: "树叶" },
      { pinyin: "zhēng qiǎng", word: "争抢" },
      { pinyin: "jiào shì", word: "教室" },
      { pinyin: "huà zhǐ", word: "画纸" },
      { pinyin: "xiào xī xī", word: "笑嘻嘻" },
      { pinyin: "hā hā dà xiào", word: "哈哈大笑" }
    ]
  },
  {
    title: "课文14",
    words: [
      { pinyin: "yuàn yì", word: "愿意" },
      { pinyin: "mài zi", word: "麦子" },
      { pinyin: "wéi nán", word: "为难" },
      { pinyin: "sì zhōu", word: "四周" },
      { pinyin: "lì kè", word: "立刻" },
      { pinyin: "tū rán", word: "突然" },
      { pinyin: "chī jīng", word: "吃惊" },
      { pinyin: "jiāo bù", word: "脚步" },
      { pinyin: "běn gǎi", word: "本该" },
      { pinyin: "bó bo", word: "伯伯" },
      { pinyin: "diào duì", word: "钓队" },
      { pinyin: "nán wéi qíng", word: "难为情" }
    ]
  },
  {
    title: "课文15",
    words: [
      { pinyin: "hú miàn", word: "湖面" },
      { pinyin: "lián huā", word: "莲花" },
      { pinyin: "qióng kǔ", word: "穷苦" },
      { pinyin: "hé yè", word: "荷叶" },
      { pinyin: "jué duì", word: "绝对" },
      { pinyin: "hán yì", word: "含义" },
      { pinyin: "shān lǐng", word: "山岭" },
      { pinyin: "dòng wú", word: "东吴" }
    ]
  },
  {
    title: "课文16",
    words: [
      { pinyin: "léi yǔ", word: "雷雨" },
      { pinyin: "wū yún", word: "乌云" },
      { pinyin: "chuí zhí", word: "垂直" },
      { pinyin: "chuāng hu", word: "窗户" },
      { pinyin: "shǎn diàn", word: "闪电" },
      { pinyin: "léi shēng", word: "雷声" },
      { pinyin: "fáng zi", word: "房子" },
      { pinyin: "qīng xīn", word: "清新" },
      { pinyin: "wū hēi", word: "乌黑" },
      { pinyin: "hēi yā yā", word: "黑压压" },
      { pinyin: "yíng miàn pǔ lái", word: "迎面扑来" }
    ]
  },
  {
    title: "课文17",
    words: [
      { pinyin: "bāng zhù", word: "帮助" },
      { pinyin: "bāng máng", word: "帮忙" },
      { pinyin: "xiàng dǎo", word: "向导" },
      { pinyin: "yǒng yuǎn", word: "永远" },
      { pinyin: "pèng tóu", word: "碰头" },
      { pinyin: "hēi yè", word: "黑夜" },
      { pinyin: "tè bié", word: "特别" },
      { pinyin: "jī xuè", word: "积雪" },
      { pinyin: "yě wài", word: "野外" },
      { pinyin: "zhǐ diǎn", word: "指点" },
      { pinyin: "zhǐ nán zhēn", word: "指南针" },
      { pinyin: "dà zì rán", word: "大自然" },
      { pinyin: "běi jí xīng", word: "北极星" }
    ]
  },
  {
    title: "课文18",
    words: [
      { pinyin: "hē shuǐ", word: "喝水" },
      { pinyin: "bēi zi", word: "杯子" },
      { pinyin: "shī qù", word: "失去" },
      { pinyin: "shǐ yòng", word: "使用" },
      { pinyin: "róng yì", word: "容易" },
      { pinyin: "xǐ zǎo", word: "洗澡" },
      { pinyin: "bié chù", word: "别处" },
      { pinyin: "yù tǒng", word: "浴桶" },
      { pinyin: "zhǔ yào", word: "主要" },
      { pinyin: "fāng biàn", word: "方便" },
      { pinyin: "huó dòng", word: "活动" }
    ]
  },
  {
    title: "课文19",
    words: [
      { pinyin: "ěr duo", word: "耳朵" },
      { pinyin: "shàn zi", word: "扇子" },
      { pinyin: "yù dào", word: "遇到" },
      { pinyin: "tù zi", word: "兔子" },
      { pinyin: "rén jiā", word: "人家" },
      { pinyin: "bù ān", word: "不安" },
      { pinyin: "máo bìng", word: "毛病" },
      { pinyin: "tóu tòng", word: "头痛" },
      { pinyin: "zuì hòu", word: "最后" },
      { pinyin: "kuài màn", word: "快慢" },
      { pinyin: "gēn běn", word: "根本" },
      { pinyin: "tòng kuài", word: "痛快" },
      { pinyin: "dà xiàng", word: "大象" }
    ]
  },
  {
    title: "课文20",
    words: [
      { pinyin: "jué dìng", word: "决定" },
      { pinyin: "shāng diàn", word: "商店" },
      { pinyin: "jiāo huàn", word: "交换" },
      { pinyin: "gōng fu", word: "工夫" },
      { pinyin: "zhōng yú", word: "终于" },
      { pinyin: "wéi jīn", word: "围巾" },
      { pinyin: "xīng qí", word: "星期" },
      { pinyin: "wán quán", word: "完全" }
    ]
  },
  {
    title: "课文21",
    words: [
      { pinyin: "qīng wā", word: "青蛙" },
      { pinyin: "cǎo zǐ", word: "草籽" },
      { pinyin: "yīng gāi", word: "应该" },
      { pinyin: "yě yā", word: "野鸭" },
      { pinyin: "quán shuǐ", word: "泉水" },
      { pinyin: "zhú zi", word: "竹子" },
      { pinyin: "huā cóng", word: "花丛" },
      { pinyin: "jìn qíng", word: "尽情" },
      { pinyin: "dào lù", word: "道路" },
      { pinyin: "mǎi mài", word: "买卖" },
      { pinyin: "bān yùn", word: "搬运" },
      { pinyin: "dào shuǐ", word: "倒水" },
      { pinyin: "pò huài", word: "破坏" }
    ]
  },
  {
    title: "课文22",
    words: [
      { pinyin: "zhōu yóu", word: "周游" },
      { pinyin: "fǎng zhī", word: "纺织" },
      { pinyin: "biān zhī", word: "编织" },
      { pinyin: "zěn yàng", word: "怎样" },
      { pinyin: "shēng yīn", word: "声音" },
      { pinyin: "huà wén", word: "画纹" },
      { pinyin: "xiāo shī", word: "消失" },
      { pinyin: "zhěng qí", word: "整齐" },
      { pinyin: "bù pī", word: "布匹" },
      { pinyin: "chōu sī", word: "抽丝" },
      { pinyin: "sè cǎi", word: "色彩" }
    ]
  },
  {
    title: "课文23",
    words: [
      { pinyin: "zǔ xiān", word: "祖先" },
      { pinyin: "nóng lù", word: "农路" },
      { pinyin: "lán tiān", word: "蓝天" },
      { pinyin: "tào kōng", word: "掏空" },
      { pinyin: "sài pǎo", word: "赛跑" },
      { pinyin: "huí yì", word: "回忆" },
      { pinyin: "yuán shǐ", word: "原始" },
      { pinyin: "yì si", word: "意思" },
      { pinyin: "yě tù", word: "野兔" },
      { pinyin: "zhāi yě guǒ", word: "摘野果" },
      { pinyin: "yí wàng wú biān", word: "一望无边" }
    ]
  },
  {
    title: "课文24",
    words: [
      { pinyin: "jué de", word: "觉得" },
      { pinyin: "zhí rì", word: "直日" },
      { pinyin: "rén lèi", word: "人类" },
      { pinyin: "jiān nán", word: "艰难" },
      { pinyin: "jué xīn", word: "决心" },
      { pinyin: "kǔ hǎi", word: "苦海" },
      { pinyin: "yán rè", word: "炎热" },
      { pinyin: "hài pà", word: "害怕" },
      { pinyin: "cóng cǐ", word: "从此" },
      { pinyin: "shēng jī", word: "生机" },
      { pinyin: "lā gōng", word: "拉弓" },
      { pinyin: "huā cǎo shù mù", word: "花草树木" }
    ]
  },
  {
    title: "课文25",
    words: [
      { pinyin: "huáng dì", word: "皇帝" },
      { pinyin: "hū rán", word: "忽然" },
      { pinyin: "chuán shuō", word: "传说" },
      { pinyin: "qǐ fā", word: "启发" },
      { pinyin: "dào lǐ", word: "道理" },
      { pinyin: "zì yóu", word: "自由" },
      { pinyin: "shǒu lǐng", word: "首领" },
      { pinyin: "bù xíng", word: "步行" },
      { pinyin: "fā zhǎn", word: "发展" },
      { pinyin: "biàn lì", word: "便利" },
      { pinyin: "yí duàn", word: "一段" },
      { pinyin: "jiāo tōng", word: "交通" }
    ]
  }
];

// 自动修正拼音和汉字数量不一致的项
function fixPinyinWordMismatch(lessons) {
  lessons.forEach(lesson => {
    lesson.words.forEach(item => {
      const pinyinArr = item.pinyin.trim().split(/\s+/);
      const wordArr = item.word.split("");
      if (pinyinArr.length < wordArr.length) {
        // 补足拼音
        const last = pinyinArr[pinyinArr.length - 1] || "";
        while (pinyinArr.length < wordArr.length) {
          pinyinArr.push(last);
        }
        item.pinyin = pinyinArr.join(" ");
      } else if (pinyinArr.length > wordArr.length) {
        // 截断多余拼音
        item.pinyin = pinyinArr.slice(0, wordArr.length).join(" ");
      }
    });
  });
}

fixPinyinWordMismatch(lessons);

// 状态顺序
const statusOrder = ['unknown', 'maybe', 'known'];
const statusText = {
  'unknown': '不会',
  'maybe': '可能会',
  'known': '已掌握'
};
const statusClass = {
  'unknown': 'status-unknown',
  'maybe': 'status-maybe',
  'known': 'status-known'
};

// 获取/保存状态到localStorage（使用安全函数）
function getWordStatus() {
  return safeLocalStorageGet('wordStatus', {});
}
function setWordStatus(statusObj) {
  return safeLocalStorageSet('wordStatus', statusObj);
}

// 获取自定义分组数据（localStorage）
function getCustomWords() {
  return safeLocalStorageGet('customWords', []);
}
function setCustomWords(words) {
  return safeLocalStorageSet('customWords', words);
}

// 学习统计功能
function getStudyStats() {
  const wordStatus = getWordStatus();
  const allLessons = getAllLessons();
  let total = 0, unknown = 0, maybe = 0, known = 0;
  
  allLessons.forEach((lesson, lessonIdx) => {
    lesson.words.forEach((word, wordIdx) => {
      total++;
      const key = `${lessonIdx}_${wordIdx}`;
      const status = wordStatus[key] || 'unknown';
      if (status === 'unknown') unknown++;
      else if (status === 'maybe') maybe++;
      else if (status === 'known') known++;
    });
  });
  
  return { total, unknown, maybe, known };
}

// 显示学习进度
function renderStudyProgress() {
  const stats = getStudyStats();
  const progressPercent = stats.total > 0 ? (stats.known / stats.total * 100).toFixed(1) : 0;
  const progressHtml = `
    <div class="study-progress">
      <div class="progress-stats">
        <div class="progress-item">
          <span class="progress-label">总计:</span>
          <span class="progress-value">${stats.total}</span>
        </div>
        <div class="progress-item">
          <span class="progress-label">已掌握:</span>
          <span class="progress-value known">${stats.known}</span>
        </div>
        <div class="progress-item">
          <span class="progress-label">模糊:</span>
          <span class="progress-value maybe">${stats.maybe}</span>
        </div>
        <div class="progress-item">
          <span class="progress-label">不会:</span>
          <span class="progress-value unknown">${stats.unknown}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressPercent}%"></div>
        <span class="progress-text">${progressPercent}%</span>
      </div>
    </div>
  `;
  
  let progressElement = document.querySelector('.study-progress');
  if (!progressElement) {
    const container = document.querySelector('.controls');
    container.insertAdjacentHTML('afterend', progressHtml);
  } else {
    progressElement.outerHTML = progressHtml;
  }
}

// 重置功能（增强版）
function resetCharacters() {
  if (confirm('确定要重置所有学习状态吗？此操作不可撤销。')) {
    try {
      localStorage.removeItem('wordStatus');
      localStorage.removeItem('customWords');
      renderLessons();
      renderStudyProgress();
      showMessage('重置完成！', 'success');
    } catch (error) {
      console.error('重置失败:', error);
      showMessage('重置失败，请重试', 'error');
    }
  }
}

// 导出学习进度（增强版）
function exportProgress() {
  try {
    const data = {
      wordStatus: getWordStatus(),
      customWords: getCustomWords(),
      exportTime: new Date().toISOString(),
      version: '1.0',
      appName: '生字学习助手'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `生字学习进度_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage('导出成功！', 'success');
  } catch (error) {
    console.error('导出失败:', error);
    showMessage('导出失败，请重试', 'error');
  }
}

// 导入学习进度（增强版）
function importProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        
        // 验证数据格式
        if (!data.wordStatus && !data.customWords) {
          throw new Error('无效的备份文件格式');
        }
        
        if (data.wordStatus) setWordStatus(data.wordStatus);
        if (data.customWords) setCustomWords(data.customWords);
        renderLessons();
        renderStudyProgress();
        showMessage('导入成功！', 'success');
      } catch (error) {
        showMessage('文件格式错误！请选择正确的备份文件。', 'error');
        console.error('导入失败:', error);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

window.pinyinMode = false;
function togglePinyinMode() {
  window.pinyinMode = !window.pinyinMode;
  const btn = document.getElementById('pinyinModeBtn');
  btn.textContent = window.pinyinMode ? '退出拼音模式' : '拼音模式';
  debouncedRender();
}

// 添加生字面板显示/隐藏
function toggleAddWordPanel() {
  const panel = document.getElementById('addWordPanel');
  if (panel.style.display === 'none' || panel.style.display === '') {
    panel.style.display = 'block';
    document.getElementById('newWord').focus();
  } else {
    panel.style.display = 'none';
  }
}

// 添加生字功能（增强版）
function addNewCharacter() {
  const word = document.getElementById('newWord').value.trim();
  const pinyin = document.getElementById('newPinyin').value.trim();
  
  if (!word || !pinyin) {
    showMessage('请填写词组和拼音', 'error');
    return;
  }
  
  try {
    // 自动修正拼音和汉字数量
    let pinyinArr = pinyin.split(/\s+/);
    let wordArr = word.split("");
    if (pinyinArr.length < wordArr.length) {
      const last = pinyinArr[pinyinArr.length - 1] || '';
      while (pinyinArr.length < wordArr.length) {
        pinyinArr.push(last);
      }
    } else if (pinyinArr.length > wordArr.length) {
      pinyinArr = pinyinArr.slice(0, wordArr.length);
    }
    const fixedPinyin = pinyinArr.join(' ');

    // 保存到自定义分组
    let customWords = getCustomWords();
    customWords.push({ word, pinyin: fixedPinyin });
    setCustomWords(customWords);

    // 清空输入框
    document.getElementById('newWord').value = '';
    document.getElementById('newPinyin').value = '';
    toggleAddWordPanel();
    renderLessons();
    renderStudyProgress();
    showMessage(`已添加"${word}"`, 'success');
  } catch (error) {
    console.error('添加生字失败:', error);
    showMessage('添加失败，请重试', 'error');
  }
}

// 在lessons渲染前插入自定义分组
function getAllLessons() {
  let customWords = getCustomWords();
  let allLessons = [...lessons];
  if (customWords.length > 0) {
    // 查找是否已有自定义分组
    let idx = allLessons.findIndex(l => l.title === '自定义');
    if (idx === -1) {
      allLessons.push({ title: '自定义', words: customWords });
    } else {
      allLessons[idx].words = customWords;
    }
  }
  return allLessons;
}

// 状态切换函数
function toggleWordStatus(key, btn, card) {
  const wordStatus = getWordStatus();
  const current = wordStatus[key] || 'unknown';
  const next = statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length];
  wordStatus[key] = next;
  setWordStatus(wordStatus);
  
  // 局部渲染：只更新当前按钮和圆点的 class
  statusOrder.forEach(status => {
    btn.classList.remove(statusClass[status]);
  });
  btn.classList.add(statusClass[next]);
  
  // 更新右上角圆点
  const dot = card.querySelector('.status-label');
  statusOrder.forEach(status => {
    dot.classList.remove(statusClass[status]);
  });
  dot.classList.add(statusClass[next]);
  
  // 更新学习进度
  renderStudyProgress();
}

// 事件委托处理点击
function handleCardClick(e) {
  const card = e.target.closest('.character-card');
  if (!card) return;
  
  const btn = card.querySelector('.word-btn');
  const key = btn.getAttribute('data-key');
  toggleWordStatus(key, btn, card);
}

// 生成课程HTML
function generateLessonHTML(lesson, lessonIdx, filteredWords, isPrint) {
  if (isPrint) {
    // 打印模式：每行最多6个词组，且总字数不超过14
    let rows = [];
    let i = 0;
    while (i < filteredWords.length) {
      let rowWords = [];
      let charCount = 0;
      while (
        i < filteredWords.length &&
        rowWords.length < 6 &&
        charCount + filteredWords[i].word.length <= 14
      ) {
        rowWords.push(filteredWords[i]);
        charCount += filteredWords[i].word.length;
        i++;
      }
      const wordRow = `<div class='tianzi-row'>${rowWords.map(item => {
        const pinyinArr = item.pinyin.trim().split(/\s+/);
        const wordArr = item.word.split("");
        return `<div class='tianzi-word'>${wordArr.map((char, idx) => `
          <div class="tianzi-cell">
            <div class="tianzi-pinyin">${pinyinArr[idx] || ""}</div>
            <div class="tianzi-grid"></div>
          </div>
        `).join('')}</div>`;
      }).join('')}</div>`;
      rows.push(wordRow);
    }
    return `
      <div class="lesson-block">
        <div class="lesson-title">${lesson.title}</div>
        ${rows.join('')}
      </div>
    `;
  }
  
  // 非打印模式
  const wordStatus = getWordStatus();
  return `
    <div class="lesson-block">
      <div class="lesson-title">${lesson.title}</div>
      <div class="lesson-words">
        ${filteredWords.map((item, wordIdx) => {
          const origIdx = lesson.words.findIndex(w => w.word === item.word && w.pinyin === item.pinyin);
          const key = `${lessonIdx}_${origIdx}`;
          const status = wordStatus[key] || 'unknown';
          if (window.pinyinMode) {
            const highlightedPinyin = highlightSearchResults(item.pinyin, currentSearchQuery);
            return `
              <div class="character-card ${statusClass[status]}">
                <span class='status-label ${statusClass[status]}'></span>
                <button class="word-btn ${statusClass[status]}" data-key="${key}">${highlightedPinyin}</button>
              </div>
            `;
          }
          
          const highlightedWord = highlightSearchResults(item.word, currentSearchQuery);
          const highlightedPinyin = highlightSearchResults(item.pinyin, currentSearchQuery);
          
          return `
            <div class="character-card ${statusClass[status]}">
              <span class='status-label ${statusClass[status]}'></span>
              <div class="pinyin">${highlightedPinyin}</div>
              <button class="word-btn ${statusClass[status]}" data-key="${key}">${highlightedWord}</button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// 优化后的渲染函数
function renderLessons() {
  const wordStatus = getWordStatus();
  const filter = document.getElementById('filterStatus')?.value || 'all';
  const isPrint = window.matchMedia && window.matchMedia('print').matches;
  const container = document.getElementById('characterList');
  const allLessons = getAllLessons();
  
  // 使用DocumentFragment优化性能
  const fragment = document.createDocumentFragment();
  let totalFilteredWords = 0;
  
  allLessons.forEach((lesson, lessonIdx) => {
    // 过滤本课单词，包括状态过滤和搜索过滤
    const filteredWords = lesson.words.filter((item, wordIdx) => {
      const key = `${lessonIdx}_${wordIdx}`;
      const status = wordStatus[key] || 'unknown';
      
      // 状态过滤
      let statusMatch = false;
      if (filter === 'unknown-maybe') {
        statusMatch = status === 'unknown' || status === 'maybe';
      } else {
        statusMatch = filter === 'all' || status === filter;
      }
      
      // 搜索过滤
      const searchMatch = matchesSearch(item.word, item.pinyin, currentSearchQuery);
      
      return statusMatch && searchMatch;
    });
    
    if (filteredWords.length === 0) return;
    
    totalFilteredWords += filteredWords.length;
    
    const lessonElement = document.createElement('div');
    lessonElement.innerHTML = generateLessonHTML(lesson, lessonIdx, filteredWords, isPrint);
    fragment.appendChild(lessonElement.firstElementChild);
  });
  
  // 如果搜索无结果，显示提示
  if (currentSearchQuery && totalFilteredWords === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'search-no-results';
    noResults.innerHTML = `
      <div><i class="ri-search-line"></i></div>
      <div>没有找到包含 "${currentSearchQuery}" 的生字</div>
      <div style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-secondary);">
        请尝试其他关键词或检查拼写
      </div>
    `;
    fragment.appendChild(noResults);
  }
  
  container.innerHTML = '';
  container.appendChild(fragment);
  
  // 事件委托优化（只在非打印模式下绑定）
  if (!isPrint) {
    container.removeEventListener('click', handleCardClick);
    container.addEventListener('click', handleCardClick);
    
    // 添加发音按钮
    setTimeout(() => {
      addSpeechButtons();
    }, 100);
  }
  
  // 更新学习进度
  if (!isPrint) {
    renderStudyProgress();
  }
}

// 防抖渲染
const debouncedRender = debounce(renderLessons, 300);

// 搜索相关变量
let currentSearchQuery = '';

// 搜索功能
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  
  if (searchInput) {
    // 防抖搜索
    const debouncedSearch = debounce(performSearch, 300);
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      currentSearchQuery = query;
      
      // 显示/隐藏清除按钮
      clearSearchBtn.style.display = query ? 'flex' : 'none';
      
      // 执行搜索
      debouncedSearch(query);
    });
    
    // 回车键搜索
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(e.target.value.trim());
      }
    });
  }
}

function performSearch(query) {
  currentSearchQuery = query;
  renderLessons();
  
  if (query) {
    showMessage(`搜索到相关内容`, 'info', 2000);
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  
  searchInput.value = '';
  currentSearchQuery = '';
  clearSearchBtn.style.display = 'none';
  
  renderLessons();
  searchInput.focus();
}

// 高亮搜索结果
function highlightSearchResults(text, query) {
  if (!query) return text;
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 检查生字是否匹配搜索条件
function matchesSearch(word, pinyin, query) {
  if (!query) return true;
  
  const lowerQuery = query.toLowerCase();
  return word.toLowerCase().includes(lowerQuery) || 
         pinyin.toLowerCase().includes(lowerQuery);
}

// 发音功能
function initializeSpeech() {
  // 检查浏览器是否支持语音合成
  if (!('speechSynthesis' in window)) {
    console.warn('浏览器不支持语音合成功能');
    return false;
  }
  return true;
}

function speakText(text, lang = 'zh-CN') {
  if (!initializeSpeech()) {
    showMessage('您的浏览器不支持发音功能', 'error');
    return;
  }
  
  // 停止当前播放的语音
  speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8; // 语速稍慢
  utterance.pitch = 1; // 音调
  utterance.volume = 0.8; // 音量
  
  // 设置中文语音
  const voices = speechSynthesis.getVoices();
  const chineseVoice = voices.find(voice => 
    voice.lang.includes('zh') || voice.lang.includes('CN')
  );
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  }
  
  utterance.onerror = () => {
    showMessage('发音失败，请稍后重试', 'error', 2000);
  };
  
  speechSynthesis.speak(utterance);
}

function addSpeechButtons() {
  // 为每个生字卡片添加发音按钮
  const characterCards = document.querySelectorAll('.character-card');
  
  characterCards.forEach(card => {
    const wordBtn = card.querySelector('.word-btn');
    const pinyinDiv = card.querySelector('.pinyin');
    
    if (!card.querySelector('.speech-btn')) {
      const speechBtn = document.createElement('button');
      speechBtn.className = 'speech-btn';
      speechBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
      speechBtn.title = '点击发音';
      speechBtn.setAttribute('aria-label', '发音');
      
      // 获取生字文本
      const wordText = wordBtn.textContent.trim();
      
      speechBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        speakText(wordText);
        
        // 视觉反馈
        speechBtn.style.color = 'var(--primary-color)';
        setTimeout(() => {
          speechBtn.style.color = '';
        }, 1000);
      };
      
      card.appendChild(speechBtn);
    }
  });
}

// 全局标志：是否正在进行自定义打印
let isCustomPrinting = false;

// 打印时重新渲染，确保田字格生效
if (window.matchMedia) {
  window.matchMedia('print').addEventListener('change', e => {
    // 如果正在进行自定义打印，跳过重新渲染
    if (isCustomPrinting) {
      console.log('自定义打印中，跳过重新渲染');
      return;
    }
    
    if (e.matches) {
      renderLessons();
    } else {
      setTimeout(renderLessons, 100);
    }
  });
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'p':
        e.preventDefault();
        printPage();
        break;
      case 'f':
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        break;
      case 'a':
        e.preventDefault();
        toggleAddWordPanel();
        break;
      case 's':
        e.preventDefault();
        exportProgress();
        break;
      case 'o':
        e.preventDefault();
        importProgress();
        break;
    }
  }
  
  // ESC 键关闭添加面板
  if (e.key === 'Escape') {
    const panel = document.getElementById('addWordPanel');
    if (panel && panel.style.display === 'block') {
      toggleAddWordPanel();
    }
  }
});

// 全局错误处理
window.addEventListener('error', function(e) {
  console.error('应用错误:', e.error);
  // 可以添加错误上报逻辑
});

// 显示使用说明
function showHelp() {
  const helpContent = `
    <div style="text-align: left; line-height: 1.6;">
      <h3>使用说明</h3>
      <ul>
        <li><strong>点击生字卡片</strong>：切换学习状态（不会→模糊→已掌握）</li>
        <li><strong>筛选功能</strong>：可按学习状态筛选显示</li>
        <li><strong>拼音模式</strong>：只显示拼音，用于测试</li>
        <li><strong>添加生字</strong>：可添加自定义词组</li>
        <li><strong>打印功能</strong>：生成田字格练习纸</li>
        <li><strong>导入导出</strong>：备份和恢复学习进度</li>
      </ul>
      <h4>快捷键</h4>
      <ul>
        <li>Ctrl+P：打印</li>
        <li>Ctrl+F：聚焦筛选</li>
        <li>Ctrl+A：添加生字</li>
        <li>Ctrl+S：导出进度</li>
        <li>Ctrl+O：导入进度</li>
        <li>ESC：关闭面板</li>
      </ul>
    </div>
  `;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  `;
  
  content.innerHTML = helpContent + `
    <div style="text-align: center; margin-top: 1.5rem;">
      <button onclick="this.closest('.modal').remove()" style="
        background: #3b82f6;
        color: white;
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
      ">知道了</button>
    </div>
  `;
  
  modal.className = 'modal';
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  renderLessons();
  renderStudyProgress();
  initializeSearch();
  
  // 添加快捷键提示
  const helpText = document.createElement('div');
  helpText.className = 'keyboard-shortcuts';
  helpText.innerHTML = `
    <div class="shortcuts-title">快捷键:</div>
    <div class="shortcuts-list">
      <span>Ctrl+P: 打印</span>
      <span>Ctrl+F: 筛选</span>
      <span>Ctrl+A: 添加生字</span>
      <span>Ctrl+S: 导出进度</span>
      <span>Ctrl+O: 导入进度</span>
      <span>ESC: 关闭面板</span>
    </div>
    <div style="margin-top: 0.5rem; text-align: center;">
      <button onclick="showHelp()" style="
        background: none;
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.7rem;
        cursor: pointer;
      ">帮助</button>
    </div>
  `;
  document.body.appendChild(helpText);
  
  // 首次访问显示帮助
  if (!localStorage.getItem('hasVisited')) {
    setTimeout(() => {
      showHelp();
      localStorage.setItem('hasVisited', 'true');
    }, 1000);
  }
});

function printPage() {
  showPrintModeDialog();
}

// 显示打印模式选择对话框
function showPrintModeDialog() {
  const modal = document.createElement('div');
  modal.className = 'print-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  `;
  
  dialog.innerHTML = `
    <h3 style="margin-bottom: 1.5rem; text-align: center; color: var(--text-primary);">
      <i class="ri-printer-line" style="margin-right: 0.5rem;"></i>
      选择打印模式
    </h3>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <button id="printAllBtn" style="
        padding: 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s;
      ">
        <i class="ri-file-list-3-line"></i>
        打印屏幕上所有生字
      </button>
      <button id="printCustomBtn" style="
        padding: 1rem;
        background: var(--success-color);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s;
      ">
        <i class="ri-file-edit-line"></i>
        生成自定义生字本
      </button>
      <button id="cancelPrintBtn" style="
        padding: 0.75rem;
        background: #f3f4f6;
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
      ">
        取消
      </button>
    </div>
  `;
  
  modal.appendChild(dialog);
  document.body.appendChild(modal);
  
  // 添加按钮事件
  document.getElementById('printAllBtn').onclick = () => {
    modal.remove();
    printCurrentScreen();
  };
  
  document.getElementById('printCustomBtn').onclick = () => {
    modal.remove();
    showCustomPrintDialog();
  };
  
  document.getElementById('cancelPrintBtn').onclick = () => {
    modal.remove();
  };
  
  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // ESC键关闭
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

// 打印当前屏幕显示的所有生字
function printCurrentScreen() {
  window.print();
}

// 显示自定义生字本对话框
function showCustomPrintDialog() {
  const stats = getStudyStats();
  
  const modal = document.createElement('div');
  modal.className = 'custom-print-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  `;
  
  dialog.innerHTML = `
    <h3 style="margin-bottom: 1.5rem; text-align: center; color: var(--text-primary);">
      <i class="ri-file-edit-line" style="margin-right: 0.5rem;"></i>
      自定义生字本
    </h3>
    <div style="margin-bottom: 1.5rem;">
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; text-align: center;">
        当前共有：不会 ${stats.unknown} 个，模糊 ${stats.maybe} 个，已掌握 ${stats.known} 个
      </p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <label style="min-width: 80px; color: var(--text-primary); font-weight: 500;">
            <span class="status-unknown" style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
            不会:
          </label>
          <input type="number" id="unknownCount" min="0" max="${stats.unknown}" value="0" style="
            flex: 1;
            padding: 0.5rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 0.9rem;
          ">
          <span style="color: var(--text-secondary); font-size: 0.8rem;">最多${stats.unknown}个</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <label style="min-width: 80px; color: var(--text-primary); font-weight: 500;">
            <span class="status-maybe" style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
            模糊:
          </label>
          <input type="number" id="maybeCount" min="0" max="${stats.maybe}" value="0" style="
            flex: 1;
            padding: 0.5rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 0.9rem;
          ">
          <span style="color: var(--text-secondary); font-size: 0.8rem;">最多${stats.maybe}个</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <label style="min-width: 80px; color: var(--text-primary); font-weight: 500;">
            <span class="status-known" style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
            已掌握:
          </label>
          <input type="number" id="knownCount" min="0" max="${stats.known}" value="0" style="
            flex: 1;
            padding: 0.5rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 0.9rem;
          ">
          <span style="color: var(--text-secondary); font-size: 0.8rem;">最多${stats.known}个</span>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 1rem; justify-content: space-between;">
      <button id="generatePrintBtn" style="
        flex: 1;
        padding: 0.75rem;
        background: var(--success-color);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      ">
        <i class="ri-printer-line"></i>
        生成并打印
      </button>
      <button id="cancelCustomPrintBtn" style="
        padding: 0.75rem 1.5rem;
        background: #f3f4f6;
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
      ">
        取消
      </button>
    </div>
  `;
  
  modal.appendChild(dialog);
  document.body.appendChild(modal);
  
  // 添加按钮事件
  document.getElementById('generatePrintBtn').onclick = () => {
    const unknownCount = parseInt(document.getElementById('unknownCount').value) || 0;
    const maybeCount = parseInt(document.getElementById('maybeCount').value) || 0;
    const knownCount = parseInt(document.getElementById('knownCount').value) || 0;
    
    if (unknownCount + maybeCount + knownCount === 0) {
      showMessage('请至少选择一个生字数量', 'error');
      return;
    }
    
    modal.remove();
    generateCustomPrint(unknownCount, maybeCount, knownCount);
  };
  
  document.getElementById('cancelCustomPrintBtn').onclick = () => {
    modal.remove();
  };
  
  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // ESC键关闭
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

// 生成自定义生字本并打印
function generateCustomPrint(unknownCount, maybeCount, knownCount) {
  const wordStatus = getWordStatus();
  const allLessons = getAllLessons();
  
  // 收集各状态的生字
  const unknownWords = [];
  const maybeWords = [];
  const knownWords = [];
  
  allLessons.forEach((lesson, lessonIdx) => {
    lesson.words.forEach((word, wordIdx) => {
      const key = `${lessonIdx}_${wordIdx}`;
      const status = wordStatus[key] || 'unknown';
      const wordData = { ...word, lesson: lesson.title, key };
      
      switch (status) {
        case 'unknown':
          unknownWords.push(wordData);
          break;
        case 'maybe':
          maybeWords.push(wordData);
          break;
        case 'known':
          knownWords.push(wordData);
          break;
      }
    });
  });
  
  // 随机选择指定数量的生字
  const selectedWords = [];
  
  if (unknownCount > 0) {
    const shuffled = [...unknownWords].sort(() => Math.random() - 0.5);
    selectedWords.push(...shuffled.slice(0, unknownCount));
  }
  
  if (maybeCount > 0) {
    const shuffled = [...maybeWords].sort(() => Math.random() - 0.5);
    selectedWords.push(...shuffled.slice(0, maybeCount));
  }
  
  if (knownCount > 0) {
    const shuffled = [...knownWords].sort(() => Math.random() - 0.5);
    selectedWords.push(...shuffled.slice(0, knownCount));
  }
  
  console.log(`选中的生字总数: ${selectedWords.length}`, {
    unknown: unknownCount,
    maybe: maybeCount,
    known: knownCount,
    selectedWords: selectedWords.map(w => w.word)
  });
  
  // 按课程重新分组
  const lessonGroups = {};
  selectedWords.forEach(word => {
    if (!lessonGroups[word.lesson]) {
      lessonGroups[word.lesson] = [];
    }
    lessonGroups[word.lesson].push(word);
  });
  
  // 生成打印内容
  generatePrintContent(lessonGroups, selectedWords.length);
}

// 生成打印内容
function generatePrintContent(lessonGroups, totalCount) {
  const container = document.getElementById('characterList');
  const originalContent = container.innerHTML;
  
  // 设置自定义打印标志
  isCustomPrinting = true;
  console.log('开始自定义打印，设置标志位');
  
  // 创建打印专用内容
  let printHTML = '';
  let processedCount = 0;
  
  // 添加标题显示总数
  printHTML += `<div style="text-align: center; margin-bottom: 1rem; font-size: 1.1rem; font-weight: bold;">自定义生字本 (共${totalCount}个生字)</div>`;
  
  Object.keys(lessonGroups).forEach(lessonTitle => {
    const words = lessonGroups[lessonTitle];
    if (words.length === 0) return;
    
    printHTML += `<div class="lesson-block">`;
    printHTML += `<div class="lesson-title">${lessonTitle} (${words.length}个)</div>`;
    
    processedCount += words.length;
    console.log(`处理课程: ${lessonTitle}, 生字数: ${words.length}`);
    
    // 每行最多6个词组，且总字数不超过14
    let i = 0;
    while (i < words.length) {
      let rowWords = [];
      let charCount = 0;
      
      while (
        i < words.length &&
        rowWords.length < 6 &&
        charCount + words[i].word.length <= 14
      ) {
        rowWords.push(words[i]);
        charCount += words[i].word.length;
        i++;
      }
      
      if (rowWords.length > 0) {
        printHTML += `<div class='tianzi-row' style="display: flex; flex-wrap: wrap; margin-bottom: 0.5cm;">`;
        rowWords.forEach(word => {
          const pinyinArr = word.pinyin.trim().split(/\s+/);
          const wordArr = word.word.split("");
          
          printHTML += `<div class='tianzi-word' style="display: flex; flex-direction: row; margin-right: 0.5cm;">`;
          wordArr.forEach((char, idx) => {
            printHTML += `
              <div class="tianzi-cell" style="display: flex; flex-direction: column; align-items: center;">
                <div class="tianzi-pinyin" style="font-size: 0.44cm; margin-bottom: 0.08cm; text-align: center;">${pinyinArr[idx] || ""}</div>
                <div class="tianzi-grid" style="width: 1.31cm; height: 1.31cm; border: 1.1px solid #000; position: relative;">
                  <div style="position: absolute; left: 50%; top: 0; width: 0; height: 100%; border-left: 1px dashed #888; transform: translateX(-50%);"></div>
                  <div style="position: absolute; top: 50%; left: 0; width: 100%; height: 0; border-top: 1px dashed #888; transform: translateY(-50%);"></div>
                </div>
              </div>
            `;
          });
          printHTML += `</div>`;
        });
        printHTML += `</div>`;
      }
    }
    
    printHTML += `</div>`;
  });
  
  console.log(`实际处理的生字总数: ${processedCount}`);
  
  // 如果没有选中任何生字，显示提示
  if (processedCount === 0) {
    printHTML = '<div style="text-align: center; padding: 2rem; font-size: 1.2rem;">没有找到符合条件的生字</div>';
  }
  
  // 更新显示内容
  container.innerHTML = printHTML;
  
  // 确保DOM更新完成后再打印
  requestAnimationFrame(() => {
    setTimeout(() => {
      console.log('开始打印...');
      window.print();
      
      // 监听打印完成事件，恢复原内容
      const afterPrint = () => {
        console.log('打印完成，恢复原内容');
        // 清除自定义打印标志
        isCustomPrinting = false;
        console.log('清除自定义打印标志位');
        
        container.innerHTML = originalContent;
        // 重新绑定事件
        container.removeEventListener('click', handleCardClick);
        container.addEventListener('click', handleCardClick);
        window.removeEventListener('afterprint', afterPrint);
        showMessage('打印完成，已恢复页面显示', 'success');
      };
      
      window.addEventListener('afterprint', afterPrint);
      
      // 备用恢复机制，防止打印对话框被取消时内容无法恢复
      setTimeout(() => {
        if (isCustomPrinting && container.innerHTML === printHTML) {
          console.log('备用恢复机制触发');
          afterPrint();
        }
      }, 5000);
    }, 200);
  });
}

// 学习分析功能
function showAnalysisReport() {
  const stats = getStudyStats();
  const masteryRate = Math.round((stats.known / stats.total) * 100);
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  `;
  
  dialog.innerHTML = `
    <h3 style="margin-bottom: 1.5rem; text-align: center; color: var(--text-primary);">
      <i class="ri-bar-chart-line" style="margin-right: 0.5rem;"></i>
      学习分析报告
    </h3>
    
    <div style="background: var(--bg-primary); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--success-color);">${stats.known}</div>
          <div style="color: var(--text-secondary);">已掌握</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">${masteryRate}%</div>
          <div style="color: var(--text-secondary);">掌握率</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--warning-color);">${stats.maybe}</div>
          <div style="color: var(--text-secondary);">模糊</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: var(--danger-color);">${stats.unknown}</div>
          <div style="color: var(--text-secondary);">不会</div>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 1rem; color: var(--text-primary);">💡 学习建议</h4>
      ${generateQuickRecommendations(stats, masteryRate)}
    </div>
    
    <div style="text-align: center;">
      <button onclick="this.closest('.modal').remove()" style="
        padding: 0.75rem 2rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
      ">
        知道了
      </button>
    </div>
  `;
  
  modal.className = 'modal';
  modal.appendChild(dialog);
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function generateQuickRecommendations(stats, masteryRate) {
  const recommendations = [];
  
  if (masteryRate >= 80) {
    recommendations.push(`
      <div style="padding: 1rem; margin-bottom: 0.75rem; border-left: 4px solid var(--success-color); background: var(--bg-primary); border-radius: 0 6px 6px 0;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">🎉 表现优秀</div>
        <div style="color: var(--text-secondary); font-size: 0.9rem;">掌握率达到${masteryRate}%，继续保持！建议复习模糊的生字。</div>
      </div>
    `);
  } else if (masteryRate >= 60) {
    recommendations.push(`
      <div style="padding: 1rem; margin-bottom: 0.75rem; border-left: 4px solid var(--primary-color); background: var(--bg-primary); border-radius: 0 6px 6px 0;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">📈 稳步提升</div>
        <div style="color: var(--text-secondary); font-size: 0.9rem;">掌握率${masteryRate}%，还有提升空间。建议每天练习不会的生字。</div>
      </div>
    `);
  } else {
    recommendations.push(`
      <div style="padding: 1rem; margin-bottom: 0.75rem; border-left: 4px solid var(--warning-color); background: var(--bg-primary); border-radius: 0 6px 6px 0;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">💪 需要加强</div>
        <div style="color: var(--text-secondary); font-size: 0.9rem;">掌握率${masteryRate}%，建议每天重点练习不会的生字，制定学习计划。</div>
      </div>
    `);
  }
  
  if (stats.maybe > stats.total * 0.3) {
    recommendations.push(`
      <div style="padding: 1rem; margin-bottom: 0.75rem; border-left: 4px solid var(--warning-color); background: var(--bg-primary); border-radius: 0 6px 6px 0;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">🔄 巩固练习</div>
        <div style="color: var(--text-secondary); font-size: 0.9rem;">有${stats.maybe}个模糊的生字，建议多复习巩固。</div>
      </div>
    `);
  }
  
  return recommendations.join('');
} 