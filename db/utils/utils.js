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
   return comments.map((comment) => {
   const {created_by, belongs_to, created_at, article_id} = comment;
   comment.author = created_by;
   comment.title = belongs_to;
    comment.article_id = (articleRef[belongs_to])
    comment.created_at = new Date(created_at);
   delete comment.belongs_to;
   delete comment.created_by;
   delete comment.title;
    return comment;
  });
};