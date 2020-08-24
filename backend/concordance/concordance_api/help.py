def getListSentence(source):
    newlist, dicpos = [], {}
    for item in source:
        if item[1] in dicpos:
            newlist[dicpos[item[1]]][1].append(item[3])
        else:
            newlist.append([item[1], [item[3]]])
            dicpos[item[1]] = len(dicpos)
    for i in range(len(newlist)):
        newlist[i][1] = " ".join(newlist[i][1])
    return newlist