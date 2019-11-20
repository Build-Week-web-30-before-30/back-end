module.exports = items => {
  if (items.length >= 1) {
    return items.map(item => ({
      ...item,
      completed: !!item.completed
    }));
  } else {
    return {
      ...items,
      completed: !!items.completed
    };
  }
};
