const MENU = {
  짜장: { price: 7000 },
  짬뽕: { price: 9900 },
  탕슉: { price: 25000, taxfree: 1 },
};

// const [labelSize, priceSize] = [7, 7];
const LABEL_SIZE = 6;
const PRICE_SIZE = 7;

const bill = () => {
  const orderedItems = [];
  const total = { vat: 0, price: 0 };

  return {
    orderOrcancel(menuName, flag = 1) {
      const { price, taxfree } = MENU[menuName];
      const vat = calcVat(price, taxfree);
      total.price += price * flag;
      total.vat += vat * flag;
      const itemIdx = orderedItems.findIndex(oi => oi.menuName === menuName);
      // console.log(menuName, itemIdx, flag);
      if (itemIdx === -1) {
        orderedItems.push({ menuName, price, vat, cnt: 1 });
        return;
      }

      const item = orderedItems[itemIdx];
      item.cnt += flag;
      if (item.cnt === 0) orderedItems.splice(itemIdx, 1);
    },

    order(menuName) {
      this.orderOrcancel(menuName);
    },

    cancel(menuName) {
      this.orderOrcancel(menuName, -1);
    },

    printBill() {
      let strsToPrint = [printLine()];
      for (const { menuName, price, vat, cnt } of orderedItems) {
        strsToPrint.push(`* ${menuName}(${cnt})`);
        strsToPrint.push(fmt`공급가액: ${price * cnt}원`);
        strsToPrint.push(fmt`부가세액: ${vat * cnt}원`);
        strsToPrint.push(printLine('-'));
      }
      strsToPrint.push(fmt`주문합계: ${total.price}원`);
      strsToPrint.push(fmt`세액합계: ${total.vat}원`);
      strsToPrint.push(printLine());
      console.log(strsToPrint.join('\n'));
    },
  };
};

const table1 = bill();
table1.order('짜장');
table1.order('짬뽕');
table1.printBill();
console.log('\n\n');
table1.order('짜장');
table1.cancel('짬뽕');
table1.cancel('짜장');
table1.order('탕슉');
table1.printBill();

function printLine(delim = '=') {
  // console.log(delim.repeat(LABEL_SIZE * 2 + PRICE_SIZE));
  return delim.repeat(LABEL_SIZE * 2 + PRICE_SIZE);
}

function calcVat(price, taxfree) {
  return taxfree ? 0 : Math.round((price / 1.1) * 0.1);
}

function fmt(txts, num) {
  const [label, unit] = txts;
  const labelStr = label.padEnd(LABEL_SIZE, ' ');
  const numStr = num.toLocaleString().padStart(PRICE_SIZE, ' ');
  return `${labelStr}${numStr}${unit}`;
}
