module.exports = items => {
  if (items.length >= 1) {
    return items.map(item => ({
      ...item,
      isPublic: !!item.isPublic
    }));
  } else {
    return {
      ...items,
      isPublic: !!items.isPublic
    };
  }
};
