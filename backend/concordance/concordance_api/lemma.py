convert = {
    'á': ["a", "1"],
    'à': ["a", "2"],
    'ả': ["a", "3"],
    'ã': ["a", "4"],
    'ạ': ["a", "5"],
    'ă': ["aw", ""],
    'ắ': ["aw", "1"],
    'ằ': ["aw", "2"],
    'ẳ': ["aw", "3"],
    'ẵ': ["aw", "4"],
    'ặ': ["aw", "5"],
    'â': ["aa", ""],
    'ấ': ["aa", "1"],
    'ầ': ["aa", "2"],
    'ẩ': ["aa", "3"],
    'ẫ': ["aa", "4"],
    'ậ': ["aa", "5"],
    'đ': ["dd", ""],
    'é': ["e", "1"],
    'è': ["e", "2"],
    'ẻ': ["e", "3"],
    'ẽ': ["e", "4"],
    'ẹ': ["e", "5"],
    'ê': ["ee", ""],
    'ế': ["ee", "1"],
    'ề': ["ee", "2"],
    'ể': ["ee", "3"],
    'ễ': ["ee", "4"],
    'ệ': ["ee", "5"],
    'í': ["i", "1"],
    'ì': ["i", "2"],
    'ỉ': ["i", "3"],
    'ĩ': ["i", "4"],
    'ị': ["i", "5"],
    'ó': ["o", "1"],
    'ò': ["o", "2"],
    'ỏ': ["o", "3"],
    'õ': ["o", "4"],
    'ọ': ["o", "5"],
    'ô': ["oo", ""],
    'ố': ["oo", "1"],
    'ồ': ["oo", "2"],
    'ổ': ["oo", "3"],
    'ỗ': ["oo", "4"],
    'ộ': ["oo", "5"],
    'ơ': ["ow", ""],
    'ớ': ["ow", "1"],
    'ờ': ["ow", "2"],
    'ở': ["ow", "3"],
    'ỡ': ["ow", "4"],
    'ợ': ["ow", "5"],
    'ú': ["u", "1"],
    'ù': ["u", "2"],
    'ủ': ["u", "3"],
    'ũ': ["u", "4"],
    'ụ': ["u", "5"],
    'ư': ["uw", ""],
    'ứ': ["uw", "1"],
    'ừ': ["uw", "2"],
    'ử': ["uw", "3"],
    'ữ': ["uw", "4"],
    'ự': ["uw", "5"],
    'ý': ["y", "1"],
    'ỳ': ["y", "2"],
    'ỷ': ["y", "3"],
    'ỹ': ["y", "4"],
    'ỵ': ["y", "5"],
}


from re import split
import json


def vnLemma(word):
    temp = word
    words = split(r"\s+", temp)
    for index, word in enumerate(words):
        word = word.strip()
        for x in word:
            if x in convert:
                word = word.replace(x,convert[x][0])
                word += convert[x][1]
                break
        words[index] = word
    return "_".join(words)


def wordToLemma(word, lang):
    if lang == "en":
        word += " "
        with open('static/english_morpho.json',) as f:
            data = json.load(f)
        if not data.get(word):
            return word
        return data[word]
    return vnLemma(word)