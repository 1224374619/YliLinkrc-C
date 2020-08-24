import axios from '../utils/http'
import Vue from '../main'

// global


//获取简历简讯
export const brief = () => axios.get('/consumer-core/resume/brief');


//resume add commit
//荣誉奖项添加
export const awardsadd = (id,params) => axios.post(`/consumer-core/resume/${id}/award`,params);
export const awardskeepurl = (id,perId) => axios.get(`/consumer-core/resume/${id}/award/${perId}/cert/url`);
//教育经历添加
export const eduadd = (id,params) => axios.post(`/consumer-core/resume/${id}/education`,params);
//求职意向添加
export const jobintensionadd = (id,params) => axios.put(`/consumer-core/resume/${id}/target`,params);
//语言能力
export const languageadd = (id,params) => axios.post(`/consumer-core/resume/${id}/language`,params);
//职称等级
export const professionaladd = (id,params) => axios.post(`/consumer-core/resume/${id}/qualification`,params);
//项目经历
export const projectadd = (id,params) => axios.post(`/consumer-core/resume/${id}/project`,params);
//个人技能
export const skilladd = (id,params) => axios.post(`/consumer-core/resume/${id}/skill`,params);
export const skilladdurl = (id,perId) => axios.get(`/consumer-core/resume/${id}/skill/${perId}/cert/url`);
//培训经历
export const trainadd = (id,params) => axios.post(`/consumer-core/resume/${id}/training`,params);
//工作经历
export const workadd = (id,params) => axios.post(`/consumer-core/resume/${id}/work`,params);




//resume
//项目经历删除
export const deleteproject = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/project/${paramsId}`)
//语言能力删除
export const deletelanguage = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/language/${paramsId}`)
//职称等级删除
export const deletetrain = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/training/${paramsId}`)
//教育经历删除
export const deletedu = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/education/${paramsId}`)
//荣誉奖项删除
export const deleteawards = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/award/${paramsId}`)
//工作经历删除
export const deletework = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/work/${paramsId}`)
//职称等级删除
export const deleteprofession = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/qualification/${paramsId}`)
//专业技能删除
export const deleteskill = (id,paramsId) => axios.delete(`/consumer-core/resume/${id}/skill/${paramsId}`)
//求职意向保存
export const jobintensionkeep = (id,params) => axios.put(`/consumer-core/resume/${id}/target`,params);
//个人信息
export const informationkeep = (id,params) => axios.put(`/consumer-core/resume/${id}/base`,params);
//自我介绍
export const selfappraisalkeep = (id,params) => axios.put(`/consumer-core/resume/${id}/evaluation`,params);
//荣誉奖项保存
export const awardskeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/award/${paramsId}`,params);
//专业技能
export const skillkeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/skill/${paramsId}`,params);
 //语言能力
export const languagekeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/language/${paramsId}`,params);
//职称等级
export const professionkeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/qualification/${paramsId}`,params);
//培训经历保存
export const trainingkeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/training/${paramsId}`,params);
//工作保存
export const workkeeped = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/work/${paramsId}`,params);
//教育保存
export const educationkeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/education/${paramsId}`,params);
//项目经历保存
export const progectkeep = (id,paramsId,params) => axios.put(`/consumer-core/resume/${id}/project/${paramsId}`,params);
//获取简历详情
export const resumeId = (id) => axios.get(`/consumer-core/resume/${id}`);





//station

//确认投递
export const showdeliver = (id,paramsId) => axios.put(`/consumer-core/submitted/position/${id}/resume/${paramsId}`);
//确认收藏
export const iscollect = (id) => axios.put(`/consumer-core/favorite/position/${id}`);
//获取岗位详情
export const positionDetail = (id) => axios.get(`/consumer-core/position/${id}`);
//判断简历是否投递
export const showdeli = (id) => axios.get(`/consumer-core/submitted/position/${id}`);
//判断简历是否收藏
export const showcoll = (id) => axios.get(`/consumer-core/favorite/position/${id}`);

//position

//获取公司详情
export const companyDetail = (id) => axios.get(`/consumer-core/company/${id}`);
//获取岗位列表
export const positionlist = (id,params) => axios.get(`/consumer-core/company/${id}/positions`,{params:params});
//岗位分类
export const positionCatalogs = (id) => axios.get(`/consumer-core/company/${id}/positionCatalogs`);



//joblist

//公司搜索
export const companySearch = (params) => axios.post('/consumer-core/company/search',params);
//职位搜索
export const positionSearch = (params) => axios.post('https://www.yinlinkrc.com/api/v1/consumer-core/position/search',params);
//获取简单选项信息
export const option = () => axios.get('http://localhost:8081/option.json');



// home

//轮播图
export const carousel = () => axios.get('/carousel');
//tabs--推荐
export const recommendation = () => axios.get('/consumer-core/home/recommended/position');
//tabs--最新
export const newposition = () => axios.get('/consumer-core/home/recent/position');
//热门企业
export const hotcompany = () => axios.get('/consumer-core/popular/company');
 //热门词
export const hotkeyword = () => axios.get('/consumer-core/popular/keyword');
//热门职位
export const hotposition = () => axios.get('/consumer-core/popular/position');
//搜索
export const homeSearch = (params) => axios.post('/consumer-core/position/search',params);





// personal

//获取投递过的岗位
export const submitted = (params) => axios.get('/consumer-core/submitted/position',{params});
//获取收藏的岗位
export const favorite = (params) => axios.get('/consumer-core/favorite/position',{params});
//取消对岗位的收藏
export const isfavorite = (id) => axios.delete(`/consumer-core/favorite/position/${id}`);
//获取推荐岗位
export const searched = (params) => axios.post('/consumer-core/position/search',params);



//inforchange

//重置密码
export const resetPassword = (params) => axios.put('consumer-user/account/password',params);
//更换手机号
export const resetPhone = (params) => axios.put('consumer-user/account/phone',params);
