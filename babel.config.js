module.exports = {
  presets: [
    '@vue/app'
  ],
  //element-ui按需引用
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
