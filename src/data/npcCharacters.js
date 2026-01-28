import topHatDuck from "../assets/top-hat-duck.png";
import coolDuck from "../assets/cool-duck.jpg";
import t1Faker from "../assets/t1-faker.webp";
import sktFaker from "../assets/skt-faker.jpg";
import ronaldo from "../assets/ronaldo.avif";
import messi from "../assets/messi.jpg";
import tenz from "../assets/tenz.jpg";
import minhBeo from "../assets/minh-beo.webp";
import jack from "../assets/jack.jpg";
import mu from "../assets/mu.jpg";
import tom from "../assets/tom.jpg";
import nganKien from "../assets/ngan-kien.png";
import ps4 from "../assets/ps4.webp";
import diegoQuy from "../assets/diego-quy.jpg";
import bacVuong from "../assets/bac-vuong.jpg";
import zoro from "../assets/zoro.jpg";
import tmlan from "../assets/lan.jpg";
import mrBeast from "../assets/mr-beast.jpg";
import hongTy from "../assets/hong-ty.jpg";
import anhDaDen from "../assets/anhdaden.jpg";
import gustave from "../assets/gustave.jpg";
import MTP from "../assets/son-tung-mtp.jpg";
import tommyXiaomi from "../assets/tommy-xiaomi.png";
import taeyeon from "../assets/taeyeon.jpg";
import naruto from "../assets/naruto.webp";
import pico from "../assets/pico.jpg";
import gd from "../assets/gd.jpg";
import andrew from "../assets/andrew.jpg";
import theGirls from "../assets/the-girls.png";
import ironFist from "../assets/iron-fist.png";
import omen from "../assets/omen.jpg";
import dracoMalfoy from "../assets/dracoMalfoy.jpg";
import { NPC } from "../model/NPC";
import stitch from "../assets/stitch.jpg";
import donalTrump from "../assets/donalTrump.jpg";
import gumball from "../assets/gumball.jpg";
import dacKy from "../assets/dacKy.jpg";
import leon from "../assets/leon.png";
import doom from "../assets/doom.jpg";
import tifa from "../assets/tifa.jpg";
import l from "../assets/l.jpg";

export const npcCharacters = [
    new NPC(1, "top hat duck", topHatDuck, [
        "Ta cừi trên nỗi đau, ta khox dưới niềm",
        "quack quackkkkkkkk quakkk",
    ]),
    new NPC(2, "cool duck", coolDuck, [
        "Better to be a cool uncle than a cool duck",
        "no cap",
    ]),
    new NPC(3, "T1 Faker", t1Faker, [
        "So you want a world ?",
        "Join T1 to get one !",
    ]),
    new NPC(4, "SKT Faker", sktFaker, ["Cụp cái pha m xuống", "chưa tài âu"]),
    new NPC(5, "Anh 7", ronaldo, [
        "Siuuuuuuuuuuuu",
        "siuuuuuuuuuuuuuuuuuuuuuuuuuu",
        "Im the goat, fuk Messi",
    ]),
    new NPC(6, "Goat", messi, ["Who the goat ?", "fuk Rồ Nah Đồ"]),
    new NPC(7, "Tenz", tenz, [
        "Bro, buy sentinel bundle",
        "Apas < Serious Duck#2305",
    ]),
    new NPC(8, "Mince Beus", minhBeo, [
        "hé lô cưng, cưng 18 chưa ấy nhờ",
        "anh bít trò ảo thuật 3 ngón tay á",
        "cưng mún xem hong",
        "à nhớ ửng hộ anh chai Mince Beus Eau de Parfum",
    ]),
    new NPC(9, "Rách", jack, [
        "Sau này khi nhìn lên bầu trời,",
        "bạn sẽ nhìn thấy một vì tinh tú mang tên Jack - J97",
        "ảnh ns:",
        "bến tre mảnh đất chữ tình",
        "có anh ca sĩ giật mình bỏ con",
    ]),
    new NPC(10, "Quỷ đỏ", mu, [
        "ngày ta ra khỏi hang",
        "là ngày bầu trời bị nhuộm đỏ",
    ]),
    new NPC(11, "Tom", tom, [
        "ụa Kiên hở",
        "bít Trinh âu hong",
        "nào tìm thấy ẻm thì bảo rằng:",
        "T.O mún gặp để trả áo khóa cho Trinh <3",
    ]),
    new NPC(12, "Ngân Kiên", nganKien, [
        "ủa Kiên hở",
        "Kiên làm j ở ây v",
        "áaaaaaaaa Kiên nhìn ngầu quớ với cái mũ quớ !!!",
        "hẹn Kiên sau nah",
    ]),
    new NPC(13, "PS4", ps4, [
        "bro lại bỏ bạn để về chơi với toi đấy à",
        "chơi vs toi yy bro, bọn nó phèn bỏ mịa chỉ bít đi chơi net",
    ]),
    new NPC(14, "Diego Quý", diegoQuy, [
        "anh cô đơn quớ (nhớ con gái ảnh)",
        "chơi vs Pubg vs anh hong",
        "anh hứa anh sẽ sharing kinh nghiệm tình trường",
    ]),
    new NPC(15, "Bác Vượng", bacVuong, [
        "ụa Kiên, 2 căn chung cư bựa trước mình bàn",
        "con vẫn chưa tặng bạn con hở",
        "sao dị, bác tưởng con quý bạn mình lắm (trừ anh Diego Quý)",
    ]),
    new NPC(16, "Zoro", zoro, [
        "ねえ、Luffy の仲間を探しているんだ",
        "私は迷っていません",
        "友達と離れ離れになってしまった、かわいそうに",
    ]),
    new NPC(17, "Trương Mỹ Lan", tmlan, [
        "Có coin card mà con giàu = cô",
        "ns thế chớ vuông",
    ]),
    new NPC(18, "Mr Beast", mrBeast, [
        "Here is 456,000$",
        "Take it and share it to your friends",
        "Duck get 70%, you get 31% and Penguin is -1%",
    ]),
    new NPC(19, "Hồng Tỷ", hongTy, [
        "Chào chàng trai, ...",
        "để em xúc bình xăng con cho anh nha",
    ]),
    new NPC(20, "anhdaden", anhDaDen, [
        "fill in blank",
        "_i_ger",
        "yeah singer",
    ]),
    new NPC(21, "Gustave", gustave, [
        "Nous avançons vers la mort, non par volonté, mais parce que reculer viderait nos vies de leur sens.",
        "Demain, le monde nous effacera peut-être ; mais ce soir, nous sommes encore là.",
        "Sophie, ... pourquoi tu m'as laissé seul ici ?",
    ]),
    new NPC(22, "Sơn Tùng M-TP", MTP, [
        "Flop quớ thì ghi tên anh vào",
        "Anh tìm nỗi nhớ",
        "Anh tìm quá khứ",
        "Nhớ lắm kí ức anh và em",
        "Trả lại anh yêu thương ấy",
        "Xin người hãy về nơi đây",
        "Bàn tay yếu ớt cố níu em ở lại",
        "... ",
    ]),
    new NPC(23, "Tommy Xiaomi", tommyXiaomi, [
        "Dậy dei ông cháu ơi",
        "Everyone is a whore, Grace. We just sell different parts of ourselves",
    ]),
    new NPC(24, "Taeyeon", taeyeon, [
        "Cía lùn mía",
        "chị m nhìn Asian vầy",
        "con Serious Duck vs thằng Kayron cứ bảo chị là Taylor (Blue) Switch",
    ]),
    new NPC(25, "Naruto", naruto, [
        "Ich bin der Hokage!",
        "Dattebayo!",
        "ei, bro thấy con vợ Sakuke toi âu k?",
        "djtme tìm mãi cứ trốn hoi",
    ]),
    new NPC(26, "Pico", pico, [
        "Hiii anh Kayron",
        "「このアイス最高だよ！お兄ちゃん、一緒に食べてみよう！」",
    ]),
    new NPC(27, "G Dragon", gd, [
        "Bang bang bangggg",
        "날 그냥 혼자 두게 해, 어차피 난 원래 혼자였으니까.내겐 아무도 없어, 모든 게 다 무의미해.",
        "Ei mà có 5 củ k anh mượn làm nhạc cái",
    ]),
    new NPC(28, "The Amazing Spider Man", andrew, [
        "Seems everyone will be back in Avenver Serect War",
        "BUT not uncle Ben and Gwen Stacy :(",
        "With great power, there must also come great responsibility.",
    ]),
    new NPC(29, "The Group", theGirls, [
        "Aaaaa tặng bạn Kiên tim nè",
        "chúc bn sớm tìm dc con quỷ cái bên phải",
    ]),
    new NPC(30, "Iron Fist", ironFist, [
        "Dude, I'm looking for Iron Man and some healers",
        "Qí guàn cháng hóng (CHEAPER TOWN HALL)",
    ]),
    new NPC(31, "A gold Omen", omen, [
        "People play me in games",
        "But when it come to bro Ph, that mean Omen playing Serious Duck#2305 and not vice versa",
    ]),
    new NPC(32, "Draco Malfoy", dracoMalfoy, [
        "you filthy little Mudblood!",
        "you don't deserve Slytherin",
    ]),
    new NPC(33, "Stitch", stitch, [
        "OHANA means ... family",
        "'Family' means no one gets left behind",
    ]),
    new NPC(34, "Donal Trump", donalTrump, [
        "I'm gonna make America great again",
        "But first let take Greenland",
    ]),
    //
    new NPC(35, "Gumball", gumball, [
        "What the what?!",
        "79% of stair accidents happen on the stairs",
    ]),
    new NPC(36, "Tô Đắc Kỷ", dacKy, [
        "Chào chàng",
        "Mún bít sao Trụ Vương ngày xưa mất nước k?",
        "Chơi vs ta 1 cữ là hiểu",
    ]),
    new NPC(37, "Leon Scott Kennedy", leon, [
        "Dudeee",
        "I can't hold it anymore",
        "Helpppp meeeee",
    ]),
    new NPC(38, "Doomguy", doom, [
        "I don't negotiate.",
        "I reload.",
        "Then I rip and tear.",
    ]),
    new NPC(39, "Tifa", tifa, [
        "Toi biết bạn đang nhìn cơ bụng 11 múi này",
        "đây là thứ con Chinh Me mãi mãi k có",
    ]),
    new NPC(40, "L", l, ["Everyone, the Shinigam-", "...", "..", "."]),
];
