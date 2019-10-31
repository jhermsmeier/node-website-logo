module.exports = class DOMHandler {

  constructor() {
    this.document = { parentNode: null }
    this.document.parentNode = this.document
    this.currentNode = this.document
    this.textContent = ''
  }

  onopentag( name, attr ) {

    this.textContent = ''

    var node = {
      name: name,
      attr: attr,
      textContent: null,
      parentNode: this.currentNode,
    }

    if( node.attr.class ) {
      node.attr.class = node.attr.class.split( /\s+/g )
    }

    this.currentNode.children = this.currentNode.children || []
    this.currentNode.children.push( node )
    this.currentNode = node

  }

  ontext( text ) {
    this.textContent += text
  }

  onclosetag( name ) {
    this.currentNode.textContent = this.textContent.trim()
    this.currentNode = this.currentNode.parentNode
  }

  onreset() {
    this.document = { parentNode: null }
    this.document.parentNode = this.document
    this.currentNode = this.document
    this.textContent = ''
  }

}
