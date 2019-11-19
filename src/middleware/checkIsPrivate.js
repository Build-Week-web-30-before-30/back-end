module.exports = items => {
  if (items.length > 1) {
    return items.map(item => ({
      ...item,
      private: !!item.private
    }));
  } else {
    return {
      ...items,
      private: !!items.private
    };
  }
};
