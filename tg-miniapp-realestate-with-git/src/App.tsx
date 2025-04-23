import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const apartments = [
  {
    id: 1,
    name: 'ЖК Солнечный Город',
    price: '6.2 млн ₽',
    size: '45 м²',
    floor: '3/9',
    image: 'https://via.placeholder.com/400x200?text=Квартира+1',
    map: 'https://maps.google.com?q=55.751244,37.618423'
  },
  {
    id: 2,
    name: 'ЖК Речной',
    price: '7.8 млн ₽',
    size: '56 м²',
    floor: '5/16',
    image: 'https://via.placeholder.com/400x200?text=Квартира+2',
    map: 'https://maps.google.com?q=55.7601,37.6189'
  },
];

export default function MiniApp() {
  const [selected, setSelected] = useState(null);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      apartment: selected,
      phone: phone
    };

    await fetch('https://script.google.com/macros/s/AKfycbz5fVx1f9DflzrhMJ6AiugXUtvqCjsv_R9d2x9oKKpPa1n6qqZCJyZz0CJmKnknr1mD/exec', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    WebApp.sendData(JSON.stringify(payload));
    WebApp.close();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 text-center text-lg">Спасибо! Мы свяжемся с вами.</div>
    );
  }

  if (selected) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Заявка на {selected.name}</h2>
        <img src={selected.image} alt={selected.name} className="rounded-2xl" />
        <div className="text-sm text-muted-foreground">{selected.size}, этаж {selected.floor}</div>
        <div className="text-base font-medium text-green-600">{selected.price}</div>
        <a href={selected.map} target="_blank" className="text-blue-500 underline block mt-2">Открыть на карте</a>
        <Input
          type="tel"
          placeholder="Ваш телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-4"
        />
        <Button onClick={handleSubmit} className="w-full mt-2">Отправить заявку</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Каталог квартир</h1>
      <div className="grid gap-4">
        {apartments.map((apt) => (
          <Card key={apt.id} className="shadow-xl">
            <img src={apt.image} alt={apt.name} className="rounded-t-2xl" />
            <CardContent>
              <div className="font-semibold text-lg">{apt.name}</div>
              <div className="text-sm text-muted-foreground">{apt.size}, этаж {apt.floor}</div>
              <div className="text-base font-medium text-green-600">{apt.price}</div>
              <Button onClick={() => setSelected(apt)} className="mt-2 w-full">
                Оставить заявку
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
