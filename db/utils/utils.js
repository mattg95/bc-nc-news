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
    const { created_by, belongs_to, created_at } = oldComment;
    comment.author = created_by;
    comment.article_id = articleRef[belongs_to];
    comment.created_at = new Date(created_at);
    delete comment.created_by;
    delete comment.belongs_to;
    return comment;
  });
};
