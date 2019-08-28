exports.formatDates = list => {
  return list.map(listObj => {
    const timestamp = listObj.created_at;
    const date = new Date(timestamp);
    listObj.created_at = date;
    return listObj;
  });
};

exports.makeRefObj = list => {
  let obj = {};
  for (let i = 0; i < list.length; i++) {
    const id = list[i].article_id;
    const title = list[i].title;
    obj[title] = id;
  }
  return obj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    const title = comment.belongs_to;
    comment.article_id = articleRef[title];
    delete comment.belongs_to;
    exports.formatDates([comment]);
    return comment;
  });
};
