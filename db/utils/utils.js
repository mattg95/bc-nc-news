exports.formatDates = list => {
  return list.map(listObj => {
    const timestamp = listObj.created_at;
    const date = new Date(timestamp);
    console.log(date);
    listObj.created_at = date;
    return listObj;
  });
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

exports.formatComments = (comments, articleRef) => {
  comments[0].author = comments[0].created_by;
  const title = comments[0].belongs_to;
  comments[0].article_id = articleRef[title];
  delete comments[0].created_by;
  delete comments[0].belongs_to;
  return comments;
};
