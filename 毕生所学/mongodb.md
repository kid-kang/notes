## 官方文档链接

 [http://mongoosejs.net/docs/guide.html](http://mongoosejs.net/docs/guide.html)

## MongoDB Atlas 链接地址

一、mongodb+srv://wangzhengkang:wangzhengkang@cluster0.rji8n.mongodb.net/?retryWrites=true&w=majority

二、mongodb+srv://wangzhengkang:wangzhengkang@cluster0.rji8n.mongodb.net/book-system?retryWrites=true&w=majority/user

## 安装

```js
npm i mongoose -S	//操作mongodb的包
```

## 操作数据库的步骤

```js
//====1:链接数据库
const mongoose = require("mongoose")
//通过指定的访问地址 连接mongo数据库   wanzi数据库名字
//有同名的数据库就连接它，没有时就创建该名字的数据库
mongoose.connect("mongodb://127.0.0.1:27017/wanzi",{	//参数2：基本配置
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{					//连接数据库操作返回的是Promise、所以可以.then操作
    console.log("数据库连接成功");
}).catch(()=>{
    console.log("数据库连接失败");
})


//====2:设置表规则
const Schema = mongoose.Schema	 //得到用来设置表规则的构造函数
let userSchema = new Schema({
    name: String,//字符可定义字符长度范围：minLength:、maxLength:  还能正则匹配 match:
    sex : {type:String,enum:["男","女"]}  //sex项只能是 "男" 或者 "女"
    tag: Array,
    age: {
        type: Number,
        required: true,
        default: '18',	//也可以写Date.now储存表时的时间
        min : [0,"值小于最小范围"], //值限制最小0，和错误提示
        max : 100,               //值限制最大100，不定义错误提示
        //自定义验证操作
        validate:{
            validator:function(val){
    			...js判断
    			return true  //合格
			},
            message:"数据不符规范"
        }
    }
},{	//参数2
  versionKey: false 	//去掉数据库中的 __v 属性
})


//====3:创建表,返回操作该表的对象
let userTable = mongoose.model("user", userSchema)	//1表名  2表规则


//====4增
userTable.create({
    // _id: mongoose.Types.ObjectId() 生成一个objectId值
    name:"丸子",
    age:20,
    sex:"女",
    tag:["可爱","大方","美丽"]
}).then(res=>{				//返回的是Promise、所以可以.then操作
    console.log("成功")	  //res为添加的对象，可拿到_id
}).catch(()=>{
    console.log("失败")
})

```

## 查询操作

```js
//====5查	
//方法：find({查询条件},{过滤规则},{排序及选取}) 、  findOne  、	findById
//find找不到返回[]、findOne和findById查不到返回null
/*第一个参数：查询条件
    比较查询操作符：例：age:{$ne:26}  //查询age小于18的数据
        $gt   大于
        $gte  大于等于
        $lt   小于
        $lte  小于等于
        $ne   不等于

    逻辑查询操作符：例：$and:[ {age:{$ne:26}}, {sex:"女"} ]  //查年龄小于26的女生
        $and   逻辑与
        $or    逻辑或
        $nor   逻辑非

    存在条件类操作符：例：tag:{ $in:["善良","女神"] }  //查tag数组中存在其中字段之一的数据
        $in     存在一项即可
        $nin    不存在 (与上面相反)

    数组相关条件的操作符：例：tag:{ $size:2 }	//查tag数组长度为3的数据
        $size   数组的长度
        
    正则：例子：name:/丸/   //查询name字段中包含"丸"字符的数据
    
    自定义遍历查询$where：例子
    	$where:function(){  //函数内this指向当前这条数据对象
        	return this.tag.length > 2;   //返回true表示该数据符合条件，false反之
    	}
*/
userTable.find({
    age:18,
    name:"樱桃"
}).then(res=>{
    console.log("查到的数据内容为:",  res);
})

/*第二个参数：过滤规则
	对查询到的数据结果，选择性取其中的某些字段数据
	例子：name:ture  //返回的数据中只含有name字段  不写的默认都是false
	如果第二个参数对象为空，那么就全部返回
*/


/*第三个参数：排序及选取
	排序操作：例子：sort:{ age:-1 }   //将选出的数据按降序排序返回
		sort	1升序  -1降序
	选取操作一般适用于分页：
		skip:n		选出的数据中跳过前n项
    	limit:n		选出的数据中只返回前n个数据
*/
```

## 删改操作

```js
//删除数据   deleteOne({同查询条件})    deleteMany		都返回Promose!!!!
userTable.deleteOne({name:"丸子"})   //将name为丸子的数据删除一条


//改  updateOne({同查询条件},{改操作})、updateMany、findByIdAndUpDate	都返回Promose!!!!
/*第二个参数中的属性：
	$set:{name: "wzk", age: 10}          //重新赋值, 对于引用类型是直接覆盖
	$push:{tag:["帅","酷"]}               //尾部追加，允许有重复的值
	$addToSet:{tag:["开朗","阳光","阳光"]} //尾部追加， 但是有重复的不会加
	$pop:{tag: -1}                       //-1：从首部删除一项  1：从末尾删除一项
	$pull:{$in:["幽默", "可爱"]}		  //删除对应的元素
*/

userTable.updateMany({	//修改对应元素的值
    name:"丸子" ,
    tag:{
        $elemMatch:{	 //获取匹配中的下标或键 记做$
            $in:"阳光"    //是否存在阳光  不存在直接返回
        }
    }
},{
    $set:{
        "tag.$":"自信"   // $为上面元素匹配时找到的那个值的下标或键
    }
})
```

## 表关联

```js
//原理就是在这个表中创建一个另一个表的唯一属性  然后再根据这个属性去查
//学生表
let studentSchema = new Schema({ 
    name: String,
    age: Number,
    sex: String,
    tag:Array,
    gradeId:{//定义一个关联属性
        type:Schema.Types.ObjectId,
        ref:"gradeTable"   //关联到成绩表
    }
})
//成绩表   
let gradeSchema = new Schema({
    math: Number,
    English:Number,
    chinese: Number
})


//关联查询  假设表中有许多数据  通过学生表查成绩表
studentTable.findOne({name:"丸子"}).populate("gradeId").then(res => console.log(res))
//比如一个表中有多个关联，populate可以多次调用一起查询 
//populate第一个参数是表规则的关联字段    第二个参数是过滤   返回Promise
```

## 在服务器上安装mongodb

```js
https://www.netsarang.com/zh/free-for-home-school/
//详情看中职通课件
```

