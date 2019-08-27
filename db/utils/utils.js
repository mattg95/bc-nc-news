exports.formatDates = list => {
  return list.map((listObj)=>{
  const timestamp = listObj.created_at;
  if (timestamp === undefined){ return listObj}
  const newDate = new Date(timestamp)
  const date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`
  listObj.created_at = date;
  return listObj
  }
  )

};

exports.makeRefObj = list => {
  let obj = {};
  for (let i = 0; i < list.length; i++) {
    const id = list[i].article_id;
    const title = list[i].title;
    if (title !== undefined) {
      obj[title] = id;
      console.log(obj);
    }
  }
  return obj;
};

exports.formatComments = (comments, articleRef) => {};
