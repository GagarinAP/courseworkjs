# Courseworkjs

Курсова робота з JavaScript

Статистика на моніторинг ОСББ по будинку

##Вхідні дані:
1. Персональні дані власників квартир.
2. Щоденні покази лічильника електро-енергії.
3. Щоденні покази лічильника газу.
4. Щоденні покази лучильника води(гаряча, холодна).

Файл _data.json_:
``` JSON
{
  "person": {
    "name": "value",
    "soname": "value",
    "adress": {
      "town": "value",
      "street": "value",
      "number": "value",
      "apartment": "value"
    }
  },
  "date": {
    "field": "value"
  },
  "cost": {
    "gas": {
      "field": "value"
    },
    "energy": {
      "field": "value"
    },
    "wather": {
      "cold": {
        "field": "value"
      },
      "hot": {
        "field": "value"
      }
    }
  }
}
```
