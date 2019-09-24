exports.formatDate = list => {
  return list.map(listObj => {
    const timestamp = listObj.created_at;
    const date = new Date(timestamp);
    listObj.created_at = date;
    return listObj;
  });
};

exports.makeRefObj = list => {
  return list.reduce((acc, curr) => {
    acc[curr.title] = curr.article_id;
    return acc;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(oldComment => {
    const comment = { ...oldComment };
    comment.author = comment.created_by;
    delete comment.created_by;
    const title = comment.belongs_to;
    delete comment.belongs_to;
    comment.article_id = articleRef[title];
    comment.created_at = new Date(comment.created_at);
    return comment;
  });
};
