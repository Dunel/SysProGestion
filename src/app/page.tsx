"use client"
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header title={"Lorem"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
              atque tempore esse possimus doloremque minus vel architecto
              quibusdam rerum recusandae enim quod cupiditate soluta natus nemo
              consectetur veniam in, totam est nostrum beatae quidem reiciendis?
              Incidunt corrupti asperiores aliquam consequatur placeat culpa
              earum, aut delectus magni harum? Voluptas vero nisi vel optio
              nihil eum cupiditate omnis distinctio? Voluptas ad facere,
              consequatur perferendis quisquam blanditiis hic voluptatem velit
              voluptates quae, neque harum eveniet aperiam deserunt. Ad numquam
              nostrum officiis, itaque quam voluptatibus necessitatibus modi!
              Minus culpa eveniet facilis sapiente eos possimus nobis recusandae
              consectetur perspiciatis. In, sunt excepturi saepe nesciunt maxime
              tempore similique impedit est illum, aliquam alias aperiam quam,
              at corrupti! Labore laudantium repellendus maxime possimus et
              illum asperiores modi est voluptatem aliquid sed eveniet nihil
              odio pariatur consequatur quos dolore deleniti provident, fugit
              explicabo quae commodi neque eum! Ea expedita ex dolore quis
              deserunt dolorum! Aperiam, sed illo ab voluptatum aut quam amet
              inventore recusandae voluptas hic. Beatae omnis ducimus quaerat
              nemo ea delectus aspernatur maiores, sequi natus numquam nesciunt
              blanditiis consequuntur doloribus et animi nam tenetur dolorem
              exercitationem est fuga dignissimos sed quae eligendi assumenda.
              Dolores recusandae porro, ut quas nulla ea. Explicabo blanditiis
              voluptatem numquam nobis officia?
            </GridContainer>
          </GridMain>
          <GridSecond>
            <GridContainer>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
              rem dolores porro illum, necessitatibus ratione veniam
              exercitationem excepturi voluptatem totam ipsam eveniet
              consequatur incidunt quidem repellendus error accusantium nulla ea
              similique sint dicta quis blanditiis, voluptate vero! Recusandae
              eaque laudantium ad nulla expedita saepe ex animi doloribus, aut
              dicta odit tenetur? Maxime magnam maiores aliquid iure laudantium
              in obcaecati earum.
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
