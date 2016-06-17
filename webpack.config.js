module.exports = {
 entry:{
 bundle: "./src/index.js"
},
 output: {
   filename: "public/js/[name].min.js"
 },
 module: {
   loaders: [
     {
       // test: /\.es6$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015'] 
       }
     }
   ]
 },
 devtool: 'eval',
 // devServer: {
 //      historyApiFallback: true
 //  },
 resolve: {
   extensions: ['', '.js', '.es6']
 },
}