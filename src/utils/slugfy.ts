export const slugfy = text => text.replace(/ /g, "-").toLowerCase()

export const deslugfy = text => text.replace(/-/g, " ")