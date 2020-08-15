import React, { Component } from "react";
import "./SearchController.css";
import { connect } from "react-redux";
import Tag from "./Tag";
import { dataService } from "../../Services";
import { createAction } from "../../Redux/Action";
import { FETCH_SEARCH_DATA } from "../../Redux/Action/type";
import Word from "./Word";

// const DATA_TEST = {
//   source: [
//     {
//       key: "cheap",
//       left: "' It 'll be ",
//       right: " at the price if it keeps the family happy !",
//       sentence_id: "000001",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "£ 3 is very ",
//       right: " for a hardback book .",
//       sentence_id: "000009",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "A bicycle is ",
//       right: " to run .",
//       sentence_id: "000075",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "A ",
//       right: " hotel in a seedy part of town .",
//       sentence_id: "000179",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "A government - sponsored ",
//       right: " textbooks scheme .",
//       sentence_id: "000763",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Anyway , the holiday in Sweden was ",
//       right: " than the holiday in Switzerland .",
//       sentence_id: "004027",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left:
//         "Best buys of the week are carrots and cabbages , which are plentiful and ",
//       right: " .",
//       sentence_id: "005039",
//       lang: "en",
//     },
//     {
//       key: "cheapest",
//       left: "But try to find the ",
//       right: " rates available .",
//       sentence_id: "005427",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Cauliflowers are very ",
//       right: " at the moment .",
//       sentence_id: "006010",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Children 's shoes are n't ",
//       right: " - quite the reverse .",
//       sentence_id: "006109",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Computer are becoming lots ",
//       right: " too , so more people can afford them .",
//       sentence_id: "006343",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Dressed in ",
//       right: " and vulgar finery .",
//       sentence_id: "008212",
//       lang: "en",
//     },
//     {
//       key: "cheapest",
//       left: "Even the ",
//       right: " was priced at £ 5 .",
//       sentence_id: "008495",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Glut the market with ",
//       right: " apples from abroad .",
//       sentence_id: "009501",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "He 's expert in cooking good ",
//       right: " meals .",
//       sentence_id: "010236",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "He 's just a ",
//       right: " crook .",
//       sentence_id: "012970",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "He was drinking ",
//       right: " champagne with a raffish air .",
//       sentence_id: "014198",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "His treatment of her made her feel ",
//       right: " .",
//       sentence_id: "016929",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "I 'm surprised some of those ",
//       right: " houses stay up at all .",
//       sentence_id: "018767",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "I suppose things are very ",
//       right: " .",
//       sentence_id: "023462",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "If I were you ... I 'd buy a ",
//       right: " car .",
//       sentence_id: "025019",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "If you are under 26 you can buy ",
//       right: " rail tickets .",
//       sentence_id: "025250",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "If you want to make money , buy ",
//       right: " and sell dear .",
//       sentence_id: "025500",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left:
//         "It 's a technique we can only use for items which are comparatively ",
//       right: " and simple to produce .",
//       sentence_id: "026480",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left:
//         "It 's an economy to buy good shoes they cost more , but they last much longer than ",
//       right: " ones .",
//       sentence_id: "026511",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "It 's ",
//       right: " to live in lodgings than in a hotel .",
//       sentence_id: "026556",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "It 's ",
//       right: " to ship goods by road than by rail .",
//       sentence_id: "026557",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "It 's not ",
//       right: " but I think we should buy it none the less .",
//       sentence_id: "026758",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "It 's not exactly ",
//       right: " to be a swinger , you know .",
//       sentence_id: "026764",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "It comes ",
//       right: " if you buy things in bulk .",
//       sentence_id: "027025",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "It does n't make sense to buy that expensive coat when these ",
//       right: " ones are just as good .",
//       sentence_id: "027052",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Of ham and beef , the latter meat is ",
//       right: " today .",
//       sentence_id: "029898",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Our efficient new machines are much ",
//       right: " to run .",
//       sentence_id: "030323",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Own brand goods are often ",
//       right: " .",
//       sentence_id: "030573",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Sichuan dishes are delicious and ",
//       right: " .",
//       sentence_id: "034663",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Strawberries are ",
//       right: " when they 're in season .",
//       sentence_id: "035690",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left:
//         "Sure , and if you travel at night after 9 on Tuesday , Wednesday , or Thurday , it 's ",
//       right: " yet .",
//       sentence_id: "035917",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left:
//         "Sure , and if you travel at night after 9 on Tuesday , Wednesday , or Thursday , it 's ",
//       right: " yet .",
//       sentence_id: "035918",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left:
//         "Textile workers favoured protection because they feared an influx of ",
//       right: " cloth .",
//       sentence_id: "036244",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "That used car is dirt - ",
//       right: " .",
//       sentence_id: "036725",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "That was a ",
//       right: " trick to play on her .",
//       sentence_id: "036729",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The ",
//       right: " seats in a theatre .",
//       sentence_id: "038568",
//       lang: "en",
//     },
//     {
//       key: "cheapest",
//       left: "The ",
//       right: " articles at the sale were quickly snapped up .",
//       sentence_id: "038569",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The double advantage of being easy and ",
//       right: " .",
//       sentence_id: "040446",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The firm excels at producing ",
//       right: " transistor radios .",
//       sentence_id: "041256",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The great virtue of camping is that it is ",
//       right: " .",
//       sentence_id: "042120",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left:
//         "The holiday will be very expensive but if it helps to make you fit and healthy again it will be ",
//       right: " at the price .",
//       sentence_id: "042424",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The local shop has some radios going ",
//       right: " .",
//       sentence_id: "043470",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The new system is not only ",
//       right:
//         " , but has the added advantage of being much faster than the old one .",
//       sentence_id: "044483",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The room reeked of ",
//       right: " perfume .",
//       sentence_id: "047165",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The seats there are ",
//       right: " and you can see the game better .",
//       sentence_id: "047468",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "The unaccustomed luxury of ",
//       right: " foreign travel .",
//       sentence_id: "049229",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "This method has two advantages : first it is ",
//       right: " and second it is quicker .",
//       sentence_id: "053248",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "This restaurant serves ",
//       right: " but excellent food .",
//       sentence_id: "053400",
//       lang: "en",
//     },
//     {
//       key: "cheapest",
//       left: "Tomatoes are ",
//       right: " when they are in season .",
//       sentence_id: "053752",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "We can be ",
//       right: " than anyone else , I think .",
//       sentence_id: "054609",
//       lang: "en",
//     },
//     {
//       key: "cheapest",
//       left: "We keep an eye on local exchange rates to find out where it is ",
//       right: " to buy parts from .",
//       sentence_id: "055213",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "Well , the bus fare is ",
//       right: " but you have to buy meals while you are traveling .",
//       sentence_id: "056184",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Well the bus certainly a ",
//       right: " way to go .",
//       sentence_id: "056235",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "What was his angle in buying up ",
//       right: " stocks ?",
//       sentence_id: "056910",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Which do you prefer , designer clothes or ",
//       right: " clothes ?",
//       sentence_id: "057485",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "Will the new power - station be able to supply our ",
//       right: " energy requirements ?",
//       sentence_id: "057887",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left:
//         "You 're surely not asking 40 pounds for this book ? ' ' Yes - it 's ",
//       right: " at the price ! ' .",
//       sentence_id: "058776",
//       lang: "en",
//     },
//     {
//       key: "cheap",
//       left: "You can't fob an expert off with ",
//       right: " imitations .",
//       sentence_id: "058930",
//       lang: "en",
//     },
//     {
//       key: "cheaper",
//       left: "You can get ",
//       right: " fares on certain days of the year .",
//       sentence_id: "059025",
//       lang: "en",
//     },
//   ],
//   target: [
//     {
//       key: "đấy",
//       left: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời ",
//       right: " !",
//       sentence_id: "000001",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "3 bảng Anh là quá ",
//       right: " đối_với một quyển sách bìa cứng .",
//       sentence_id: "000009",
//       lang: "vn",
//     },
//     {
//       key: "thì rẻ",
//       left: "Muốn có một chiếc xe_đạp ",
//       right: " thôi .",
//       sentence_id: "000075",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Một khách_sạn ",
//       right: " ở một khu tồi_tàn của thành_phố .",
//       sentence_id: "000179",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Một kế_hoạch in sách_giáo_khoa ",
//       right: " được nhà_nước bảo_trợ .",
//       sentence_id: "000763",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Dù_sao đi_nữa thì kỳ nghỉ ở Thuỵ_Điển cũng ",
//       right: " hơn kỳ nghỉ ở Thuỵ_Sĩ .",
//       sentence_id: "004027",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left:
//         "Những thứ bán_chạy nhất trong tuần này là cà_rốt và cải_bắp , đó là những thứ đang có nhiều và ",
//       right: " .",
//       sentence_id: "005039",
//       lang: "vn",
//     },
//     {
//       key: "rẻ nhất",
//       left: "Nhưng hãy cố tìm mức giá ",
//       right: " có_thể có nhé .",
//       sentence_id: "005427",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Dạo này cải_hoa rất ",
//       right: " .",
//       sentence_id: "006010",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Giày t",
//       right: "_em không ",
//       sentence_id: "006109",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Máy_vi_tính cũng đang trở_nên ",
//       right: " nhiều , vì vậy ngày_càng có nhiều người có_thể mua chúng .",
//       sentence_id: "006343",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Ăn_mặc những thứ ",
//       right: " và tầm_thường .",
//       sentence_id: "008212",
//       lang: "vn",
//     },
//     {
//       key: "cái rẻ nhất cũng",
//       left: "Ngay_cả ",
//       right: " được định_giá là 5 bảng Anh .",
//       sentence_id: "008495",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Cung_cấp thừa_thãi cho thị_trường những loại táo ",
//       right: " từ nước_ngoài .",
//       sentence_id: "009501",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Anh ta rất thạo nấu những bữa ăn ngon mà ",
//       right: " .",
//       sentence_id: "010236",
//       lang: "vn",
//     },
//     {
//       key: "",
//       left: "",
//       right: "Hắn chỉ là một kẻ lừa_đảo đáng khinh .",
//       sentence_id: "012970",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Hắn uống thứ sâm_banh ",
//       right: " với vẻ ăn_chơi .",
//       sentence_id: "014198",
//       lang: "vn",
//     },
//     {
//       key: "bị giảm giá_trị",
//       left: "Cách đối_xử của hắn làm cô ta cảm_thấy mình ",
//       right: " .",
//       sentence_id: "016929",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền đó vẫn còn đứng vững",
//       left: "Tôi ngạc_nhiên thấy một_số những ngôi nhà ",
//       right: " được .",
//       sentence_id: "018767",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Tôi nghĩ những thứ ở đây rất ",
//       right: " .",
//       sentence_id: "023462",
//       lang: "vn",
//     },
//     {
//       key: "Ở địa_vị anh tôi sẽ mua một chiếc ô_tô rẻ hơn",
//       left: "",
//       right: " .",
//       sentence_id: "025019",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Nếu bạn dưới 26 tuổi , bạn có_thể mua vé xe_lửa ",
//       right: " .",
//       sentence_id: "025250",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Nếu muốn làm_giàu thì mua ",
//       right: " bán đắt .",
//       sentence_id: "025500",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left:
//         "Đây là một kỹ_thuật chúng_ta chỉ có_thể áp_dụng đối_với những mặt_hàng tương_đối ",
//       right: " và sản_xuất đơn_giản .",
//       sentence_id: "026480",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left:
//         "Mua giày tốt là một việc_làm tiết_kiệm , chúng đắt tiền hơn , nhưng dùng được lâu hơn nhiều so với giày ",
//       right: " .",
//       sentence_id: "026511",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Sống trong nhà_trọ thì ",
//       right: " hơn khách_sạn .",
//       sentence_id: "026556",
//       lang: "vn",
//     },
//     {
//       key: "Vận_chuyển hàng_hoá bằng đường_bộ rẻ",
//       left: "",
//       right: " hơn bằng đường_sắt .",
//       sentence_id: "026557",
//       lang: "vn",
//     },
//     {
//       key: "rẻ , tuy_thế",
//       left: "Cái ấy không ",
//       right: " tôi nghĩ rằng chúng_ta nên mua .",
//       sentence_id: "026758",
//       lang: "vn",
//     },
//     {
//       key: "ra",
//       left: "Bạn cũng biết đúng ",
//       right: " một người sống tân_thời cũng phải tiêu nhiều tiền đó .",
//       sentence_id: "026764",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Nếu anh mua đồ với khối_lượng lớn thì sẽ ",
//       right: " .",
//       sentence_id: "027025",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền hơn",
//       left:
//         "Thật là không khôn_ngoan nếu mua chiếc áo_khoác đắt tiền này trong lúc những chiếc ",
//       right: " cũng vẫn tốt như vậy .",
//       sentence_id: "027052",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Trong giăm_bông và thịt bò , loại thịt sau ",
//       right: " .",
//       sentence_id: "029898",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Những máy mới của chúng_tôi có hiệu_quả mà lại ",
//       right: " nhiều .",
//       sentence_id: "030323",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Hàng_hoá mang nhãn của cửa_hàng thường ",
//       right: " .",
//       sentence_id: "030573",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Các món ăn Tứ_Xuyên ngon và ",
//       right: " .",
//       sentence_id: "034663",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Khi vào đúng vụ , dâu_tây ",
//       right: " .",
//       sentence_id: "035690",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left:
//         "Chắc chứ , và nếu ông đi về đêm sau 9 giờ vào tối thứ_ba , thứ_tư hay thứ năm lại còn ",
//       right: " .",
//       sentence_id: "035917",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left:
//         "Chắc chứ , và nếu ông đi về đêm sau 9 giờ vào tối thứ_ba , thứ_tư hay thứ năm lại còn ",
//       right: " .",
//       sentence_id: "035918",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left:
//         "Những công_nhân dệt ủng_hộ chế_độ bảo_vệ mậu_dịch bởi_vì họ sợ lan_tràn các loại vải ",
//       right: " .",
//       sentence_id: "036244",
//       lang: "vn",
//     },
//     {
//       key: "",
//       left: "",
//       right: "Chiếc xe_hơi cũ đó giá_như bèo .",
//       sentence_id: "036725",
//       lang: "vn",
//     },
//     {
//       key: "đáng khinh",
//       left: "Thủ_đoạn như vậy đối_với cô ta thật ",
//       right: " .",
//       sentence_id: "036729",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Chỗ ngồi ",
//       right: " trong nhà_hát .",
//       sentence_id: "038568",
//       lang: "vn",
//     },
//     {
//       key: "Người_ta đã giành mua hết mấy món hàng rẻ nhất vào dịp",
//       left: "",
//       right: " bán_hạ giá .",
//       sentence_id: "038569",
//       lang: "vn",
//     },
//     {
//       key: "dùng vừa rẻ",
//       left: "Thuận_lợi đôi đường vừa dễ ",
//       right: " .",
//       sentence_id: "040446",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Hãng này xuất_sắc trong việc chế_tạo các ra - đi - ô bán_dẫn ",
//       right: " .",
//       sentence_id: "041256",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Lợi_ích lớn của việc cắm trại là ",
//       right: " .",
//       sentence_id: "042120",
//       lang: "vn",
//     },
//     {
//       key: "thì",
//       left: "Kỳ nghỉ rất tốn_kém nhưng nếu nó làm cho bạn khoẻ ra ",
//       right: " cũng đáng_đồng_tiền lắm chứ .",
//       sentence_id: "042424",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Cửa_hiệu địa_phương có vài cái rađiô bán giá ",
//       right: " .",
//       sentence_id: "043470",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Hệ_thống mới không_chỉ ",
//       right: " hơn mà_còn có thêm thuận_lợi là nhanh hơn cái cũ .",
//       sentence_id: "044483",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Căn phòng nồng_nặc mùi nước_hoa ",
//       right: " .",
//       sentence_id: "047165",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Những chỗ ngồi ở đó ",
//       right: " và bạn có_thể thấy trận_đấu rõ hơn .",
//       sentence_id: "047468",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Sự sang_trọng khác_thường của việc đi du_lịch ",
//       right: " ra nước_ngoài .",
//       sentence_id: "049229",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Phương_pháp này có hai cái lợi : trước_hết nó ",
//       right: " và sau là nó nhanh hơn .",
//       sentence_id: "053248",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Nhà_hàng này bán ",
//       right: " mà thức_ăn rất ngon .",
//       sentence_id: "053400",
//       lang: "vn",
//     },
//     {
//       key: "rẻ nhất",
//       left: "Cà_chua ",
//       right: " khi chúng vào vụ .",
//       sentence_id: "053752",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Tôi nghĩ , chúng_tôi có_thể ",
//       right: " hơn bất_kỳ ai khác .",
//       sentence_id: "054609",
//       lang: "vn",
//     },
//     {
//       key: "để_mắt tới",
//       left: "Chúng_tôi ",
//       right: " tỷ_giá_hối_đoái để mua cổ_phần .",
//       sentence_id: "055213",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "À , vé xe_buýt ",
//       right: " nhưng ông phải mua các bữa ăn khi đi đường .",
//       sentence_id: "056184",
//       lang: "vn",
//     },
//     {
//       key: "rẻ đấy",
//       left: "À , xe_buýt chắc_chắn là cách đi ",
//       right: " .",
//       sentence_id: "056235",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left: "Mục_đích của ông trong việc mua toàn_bộ các cổ_phiếu ",
//       right: " là gì ?",
//       sentence_id: "056910",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Bạn thích loại nào hơn , quần_áo thời_trang hay quần_áo ",
//       right: " ?",
//       sentence_id: "057485",
//       lang: "vn",
//     },
//     {
//       key: "rẻ",
//       left:
//         "Liệu nhà_máy điện mới có_thể đáp_ứng được các yêu_cầu về năng_lượng giá ",
//       right: " của chúng_ta không ?",
//       sentence_id: "057887",
//       lang: "vn",
//     },
//     {
//       key: "rẻ đấy ạ",
//       left:
//         "Chắc_chắn ông không đòi 40 pao cho cuốn sách này đấy chứ ? ' ' Vâng , giá thế là ",
//       right: " ! ' .",
//       sentence_id: "058776",
//       lang: "vn",
//     },
//     {
//       key: "rẻ_tiền",
//       left: "Anh không_thể đánh_lừa một chuyên_gia bằng những đồ giả ",
//       right: " .",
//       sentence_id: "058930",
//       lang: "vn",
//     },
//     {
//       key: "rẻ hơn",
//       left: "Anh có_thể mua được vé ",
//       right: " vào một_số ngày trong năm .",
//       sentence_id: "059025",
//       lang: "vn",
//     },
//   ],
// };
class SearchController extends Component {
  state = {
    word: {
      searchValue: "",
      searchType: "",
    },
    tag: {
      pos: "",
      ner: "",
    },
    isRefresh: false,
  };
  handleWord = ({ searchValue, searchType }) => {
    let newWord = { searchValue: searchValue, searchType: searchType };
    this.setState({ word: newWord, isRefresh: false });
  };
  handleTag = ({ key, value }) => {
    let newPos = null,
      newNer = null;
    if (key === "pos") {
      newPos = value;
      newNer = "";
    } else {
      newPos = "";
      newNer = value;
    }
    let newTag = { pos: newPos, ner: newNer };
    this.setState({
      tag: newTag,
      isRefresh: false,
    });
  };
  handleRefresh = () => {
    this.setState({
      word: {
        searchValue: "",
        searchType: "",
      },
      tag: {
        pos: "",
        ner: "",
      },
      isRefresh: true,
    });
  };

  // Submit search:
  // Request to server,
  // then get data if
  //    1 => setState in Redux ,
  //    0 => Modal : alert to client
  handleOnsubmit = (e) => {
    e.preventDefault();
    let lang = this.props.languageType === "vietnamese" ? "vn" : "en";
    let optional = null;
    if (this.state.tag.pos !== "") {
      optional = {
        key: "pos",
        value: this.state.tag.pos,
      };
    } else
      optional = {
        key: "ner",
        value: this.state.tag.ner,
      };
    // this.props.dispatch(createAction(FETCH_SEARCH_DATA, DATA_TEST));
    dataService
      .fetchData_Search(
        this.state.word.searchValue,
        this.state.word.searchType,
        lang,
        optional
      )
      .then((res) => {
        this.props.dispatch(createAction(FETCH_SEARCH_DATA, res.data));
      })
      .catch((err) => {
        alert("Fail connection! Please try again!");
      });
  };
  render() {
    return (
      <div className="col-10 seach__controller mt-3">
        <form className="row" onSubmit={this.handleOnsubmit}>
          {/* SEARCH BY WORD */}
          <div className="col-5">
            <Word
              handleWord={this.handleWord}
              isRefresh={this.state.isRefresh}
            />
          </div>

          {/* SEARCH BY TAG */}
          <div className="search__tag col-5 ">
            <Tag handleTag={this.handleTag} isRefresh={this.state.isRefresh} />
          </div>

          {/* Button SUBMIT SEARCHc */}
          <div className="col-2 m-auto">
            <div className="search__button">
              <button type="submit" className="btn-search  mb-2">
                SEARCH
              </button>
              <button
                type="button"
                className="btn-refresh"
                onClick={this.handleRefresh}
              >
                REFRESH
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageType: state.Controller.language,
  };
};

export default connect(mapStateToProps)(SearchController);
