const mermaid = {
  initialize: jest.fn(),
  run: jest.fn().mockResolvedValue(undefined),
  render: jest.fn().mockResolvedValue({ svg: '<svg></svg>' })
};

module.exports = mermaid;
