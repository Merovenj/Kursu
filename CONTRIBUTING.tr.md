> [English](CONTRIBUTING.md) | **Türkçe**

# KÜRSÜ’ye Katkıda Bulunma

KÜRSÜ’yü sağlam ve etkili bir platform hâline getirmek için topluluktan gelen
katkıları memnuniyetle karşılıyor ve takdir ediyoruz. Bu belge KÜRSÜ
projesine katkıda bulunma kurallarını özetler. Katılarak [Davranış
Kuralları](./CODE_OF_CONDUCT.md) belgemize uymayı kabul etmiş olursunuz.

## İçindekiler

1.  [Başlangıç](#1-başlangıç)
    *   [Gereksinimler](#gereksinimler)
    *   [Yerel Geliştirme Kurulumu](#yerel-geliştirme-kurulumu)
    *   [Testleri Çalıştırma](#testleri-çalıştırma)
2.  [Görev Bulma](#2-görev-bulma)
    *   [Issue Etiketleri](#issue-etiketleri)
    *   [Yol Haritası](#yol-haritası)
3.  [Katkı İş Akışı](#3-katkı-iş-akışı)
    *   [Depoyu Çatallama](#depoyu-çatallama)
    *   [Branch](#branch)
    *   [Commit](#commit)
    *   [Pull Request (PR)](#pull-request-pr)
4.  [Kod Stili ve Standartlar](#4-kod-stili-ve-standartlar)
5.  [Test](#5-test)
6.  [Dokümantasyon](#6-dokümantasyon)
7.  [İletişim](#7-iletişim)
8.  [Güvenlik](#8-güvenlik)
9.  [Lisans](#9-lisans)

## 1. Başlangıç

KÜRSÜ’ye katkıda bulunmak için yerel bir geliştirme ortamı kuracaksınız.

### Gereksinimler

Aşağıdakilerin kurulu olması gerekir:

*   Node.js (v20 veya üzeri)
*   pnpm (monorepo yönetimi için)
*   Git

### Yerel Geliştirme Kurulumu

1.  **Çatalladığınız depoyu klonlayın:**
    ```bash
    git clone https://github.com/vedatgurer/Kursu.git
    cd kursu
    ```
2.  **Bağımlılıkları yükleyin:**
    KÜRSÜ, monorepo yapısı için `pnpm` workspaces kullanır.
    ```bash
    pnpm install
    ```
3.  **Ortam değişkenleri:**
    Örnek ortam dosyasını kopyalayın ve yerel geliştirme için yapılandırın.
    ```bash
    cp .env.example .env
    ```
    *Not: ilk geliştirme için mock uygunluk adaptörü varsayılan olarak etkindir.*
4.  **Geliştirme sunucusunu çalıştırın:**
    Bu, relayer ve web uygulamasını başlatır.
    ```bash
    pnpm dev
    ```
    Web uygulamasına `http://localhost:5173` üzerinden erişilebilir.

### Testleri Çalıştırma

Herhangi bir değişikliği göndermeden önce tüm testlerin geçtiğinden emin olun.

```bash
# Tüm testler
pnpm test

# Belirli bir paket için (örn. @kursu/ledger)
pnpm --filter @kursu/ledger test
```

## 2. Görev Bulma

Görevleri, hataları ve öneri taleplerini GitHub Issues üzerinden izliyoruz.

### Issue Etiketleri

Şu etiketlere bakın:

*   `good first issue`: yeni katkıcılar için ideal.
*   `help wanted`: topluluk katkısına hazır görevler.
*   `bug`: bir hata bildirin veya düzeltin.
*   `feature`: yeni bir özellik önerin veya geliştirin.
*   `documentation`: mevcut belgeleri iyileştirin veya yenisini ekleyin.

### Yol Haritası

Projenin yönü ve planlanan özellikler için [ROADMAP.md](./ROADMAP.md) belgesine
bakın.

## 3. Katkı İş Akışı

### Depoyu Çatallama

1.  [KÜRSÜ GitHub deposuna](https://github.com/vedatgurer/Kursu) gidin.
2.  Sağ üstteki “Fork” düğmesine tıklayın.

### Branch

Değişiklikleriniz için `main`’den yeni bir branch oluşturun. Açıklayıcı bir
ad kullanın (örn. `feature/uygunluk-api-ekle`, `bugfix/oylama-sayim-hatasi`).

```bash
git checkout main
git pull origin main
git checkout -b branch-adınız
```

### Commit

Açık ve özlü commit mesajları yazın. Mümkünse [Conventional
Commits](https://www.conventionalcommits.org/en/v1.0.0/) standardını izleyin
(örn. `feat: yeni uygunluk adaptörü ekle`, `fix: oylama hatasını gider`).

Tüm commit’ler **GPG ile imzalanmalıdır.** Bu, katkıların gerçekliğini
sağlar.

```bash
git commit -S -m "feat: açıklayıcı commit mesajınız"
```

### Pull Request (PR)

1.  Branch’i kendi çatalınıza gönderin:
    ```bash
    git push origin branch-adınız
    ```
2.  Kendi çatalınızdan, üst depo KÜRSÜ’nün `main` branch’ine bir Pull Request
    açın.
3.  [Pull Request Şablonu](./.github/pull_request_template.md) içindeki tüm
    alanları eksiksiz doldurun. İlgili issue’lara bağlantı verin.
4.  PR’ınız sürdürücüler (maintainers) tarafından gözden geçirilecektir.
    Geri bildirimi zamanında karşılayın.

## 4. Kod Stili ve Standartlar

*   **Linting**: kod stili için ESLint ve Prettier kullanıyoruz. PR
    göndermeden önce kodunuzun lint kontrollerinden geçtiğinden emin olun.
    ```bash
    pnpm lint
    pnpm format
    ```
*   **TypeScript**: uygun olduğunda tip güvenliği ve sürdürülebilirlik
    için TypeScript kullanın.
*   **Yorumlar**: karmaşık veya alışılmadık kod bölümlerine yorum ekleyin.

## 5. Test

Tüm yeni özellikler ve hata düzeltmeleri uygun testlerle birlikte gelmelidir.
Test için Jest kullanıyoruz. Yüksek test kapsamını hedefleyin.

## 6. Dokümantasyon

Dokümantasyonu güncel tutun. Yeni bir özellik eklediğinizde veya mevcut
işlevi değiştirdiğinizde, ilgili paket `README.md` dosyalarını, kök
`README.md`’yi veya `docs/` dizinini güncelleyin.

## 7. İletişim

Genel tartışmalar, sorular veya diğer katkıcılarla bağ kurmak için topluluk
kanallarımıza bakın (örn. Discord, Forum — *henüz belirlenecek*).

## 8. Güvenlik

Bir güvenlik açığı keşfederseniz, lütfen [SECURITY.tr.md](./SECURITY.tr.md)
içindeki yönergeleri izleyerek sorumlu biçimde bildirin.

## 9. Lisans

KÜRSÜ’ye katkıda bulunarak katkılarınızın projenin [AGPL-3.0-only
Lisansı](./LICENSE) altında lisanslanmasını kabul etmiş olursunuz.
