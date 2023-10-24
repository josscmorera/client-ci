export const addItemArray = (array, item) => {
  const newArray = copy(array);
  newArray.unshift(item);
  return newArray;
};

export const replacleItemArray = (array, item) => {
  const newArray = copy(array);
  const index = newArray.findIndex((x) => x._id === item._id);
  if (index >= 0) {
    newArray[index] = item;
  }
  return newArray;
};

export const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const searchAndAddReplyItem = (array, item) => {
  if (item.parent) {
    const newArray = copy(array);
    const index = newArray.findIndex((x) => x._id === item.parent);
    if (index >= 0) {
      newArray[index].replies = addItemArray(newArray[index].replies, item);
      return sortComments(newArray);
    } else {
      newArray.forEach((element) => {
        element.replies = addReply(element.replies, item);
      });

      return sortComments(newArray);
    }
  } else {
    return addItemArray(array, item);
  }
};

export const addReply = (array, item) => {
  const newArray = copy(array);
  const index = newArray.findIndex((x) => x._id === item.parent);
  if (index >= 0) {
    newArray[index].replies = addItemArray(newArray[index].replies, item);
    return sortComments(newArray);
  } else {
    newArray.forEach((element) => {
      element.replies = addReply(element.replies, item);
    });

    return newArray;
  }
};

export const replaceItemContent = (array, item) => {
  const newArray = copy(array);
  const index = newArray.findIndex((x) => x._id === item._id);
  if (index >= 0) {
    newArray[index].content = item.content;
    return newArray;
  } else {
    newArray.forEach((element) => {
      element.replies = replaceItemContent(element.replies, item);
    });

    return newArray;
  }
};

export const replaceUpvotesComment = (array, item) => {
  const newArray = copy(array);
  const index = newArray.findIndex((x) => x._id === item._id);
  if (index >= 0) {
    newArray[index].upvotes = item.upvotes;
    newArray[index].downvotes = item.downvotes;
    return newArray;
  } else {
    newArray.forEach((element) => {
      element.replies = replaceUpvotesComment(element.replies, item);
    });

    return newArray;
  }
};

export const removeItemArray = (array, item) => {
  const newArray = copy(array);
  const index = newArray.findIndex((x) => x._id === item._id);
  if (index >= 0) {
    newArray.splice(index, 1);
  }
  return newArray;
};

export const serchAndRemoveReplyItem = (array, item) => {
  if (item.parent) {
    const newArray = copy(array);
    const index = newArray.findIndex((x) => x._id === item.parent);
    if (index >= 0) {
      newArray[index].replies = removeItemArray(newArray[index].replies, item);
      return newArray;
    } else {
      newArray.forEach((element) => {
        element.replies = serchAndRemoveReplyItem(element.replies, item);
      });

      return newArray;
    }
  } else {
    return removeItemArray(array, item);
  }
};

export function sortComments(comments) {
  if (!Array.isArray(comments)) {
    return comments;
  }

  comments.sort((a, b) => {
    const scoreA = (a.upvotes?.length || 0) - (a.downvotes?.length || 0);
    const scoreB = (b.upvotes?.length || 0) - (b.downvotes?.length || 0);

    return scoreB - scoreA;
  });

  for (const comment of comments) {
    if (comment.replies && comment.replies?.length > 0) {
      comment.replies = sortComments(comment.replies);
    }
  }

  return comments;
}
